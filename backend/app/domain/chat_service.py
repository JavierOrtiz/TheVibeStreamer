import asyncio
from typing import AsyncGenerator

class ChatService:
    async def generate_response(self, prompt: str) -> AsyncGenerator[str, None]:
        # Simulated LLM response
        full_response = f"This is a simulated response to: {prompt}. I am streaming word by word to show you the power of SSE in FastAPI."
        words = full_response.split()
        
        for word in words:
            yield f"{word} "
            await asyncio.sleep(0.05)  # Simulate latency
