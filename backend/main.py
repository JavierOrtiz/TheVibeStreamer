from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.domain.chat_service import ChatService
from app.application.chat_use_case import ChatUseCase

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"Hello": "TheVibeStreamer"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    chat_service = ChatService()
    chat_use_case = ChatUseCase(chat_service)
    
    return StreamingResponse(
        chat_use_case.execute(request.message),
        media_type="text/event-stream"
    )
