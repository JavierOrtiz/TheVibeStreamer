import os
import asyncio
from abc import ABC, abstractmethod
from typing import AsyncGenerator
import google.generativeai as genai
from openai import AsyncOpenAI
from anthropic import AsyncAnthropic

class LLMProvider(ABC):
    @abstractmethod
    async def stream(self, prompt: str) -> AsyncGenerator[str, None]:
        pass

class GeminiProvider(LLMProvider):
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not set")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-2.5-flash-lite")

    async def stream(self, prompt: str) -> AsyncGenerator[str, None]:
        response = self.model.generate_content(prompt, stream=True)
        for chunk in response:
            if chunk.text:
                yield chunk.text

class OpenAIProvider(LLMProvider):
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise ValueError("OPENAI_API_KEY is not set")
        self.client = AsyncOpenAI(api_key=api_key)

    async def stream(self, prompt: str) -> AsyncGenerator[str, None]:
        stream = await self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            stream=True,
        )
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content

class ClaudeProvider(LLMProvider):
    def __init__(self):
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY is not set")
        self.client = AsyncAnthropic(api_key=api_key)

    async def stream(self, prompt: str) -> AsyncGenerator[str, None]:
        async with self.client.messages.stream(
            model="claude-3-5-sonnet-20240620",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}],
        ) as stream:
            async for text in stream.text_stream:
                yield text

class LLMOrchestrator:
    @staticmethod
    def get_provider() -> LLMProvider:
        provider_name = os.getenv("LLM_PROVIDER")
        if not provider_name:
            raise ValueError("LLM_PROVIDER environment variable is not set")
        
        provider_name = provider_name.lower()
        if provider_name == "gemini":
            return GeminiProvider()
        elif provider_name == "openai":
            return OpenAIProvider()
        elif provider_name == "claude":
            return ClaudeProvider()
        else:
            raise ValueError(f"Unsupported LLM provider: {provider_name}")
