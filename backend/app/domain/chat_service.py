import asyncio
from typing import AsyncGenerator
from app.domain.llm_orchestrator import LLMOrchestrator

class ChatService:
    async def generate_response(self, prompt: str) -> AsyncGenerator[str, None]:
        # Choose provider dynamically based on ENV
        provider = LLMOrchestrator.get_provider()
        
        # Stream response from the active provider
        async for token in provider.stream(prompt):
            yield token
