from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def read_root():
    return {"Hello": "TheVibeStreamer"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    return {"status": "ack"}
