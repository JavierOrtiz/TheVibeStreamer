from typing import AsyncGenerator
from app.domain.chat_service import ChatService

class ChatUseCase:
    def __init__(self, chat_service: ChatService):
        self.chat_service = chat_service

    async def execute(self, prompt: str) -> AsyncGenerator[str, None]:
        async for token in self.chat_service.generate_response(prompt):
            # Format as SSE data
            yield f"data: {token}\n\n"
