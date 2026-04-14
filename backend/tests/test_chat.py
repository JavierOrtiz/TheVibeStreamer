import os
from unittest.mock import patch
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_chat_endpoint_returns_streaming_response():
    payload = {"message": "Hello AI"}
    # Mocking the environment variable for the test
    with patch.dict(os.environ, {"LLM_PROVIDER": "openai"}):
        with client.stream("POST", "/api/chat", json=payload) as response:
            assert response.status_code == 200
            assert response.headers["content-type"] == "text/event-stream; charset=utf-8"
            
            chunks = []
            for line in response.iter_lines():
                if line:
                    # If it's already a string, don't decode
                    chunk_str = line if isinstance(line, str) else line.decode('utf-8')
                    chunks.append(chunk_str)
            
            assert len(chunks) > 0
            # Check if any chunk contains the expected provider prefix
            assert any("[OpenAI]" in chunk for chunk in chunks)
