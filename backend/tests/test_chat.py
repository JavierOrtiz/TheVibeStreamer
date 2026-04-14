from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_chat_endpoint_returns_streaming_response():
    payload = {"message": "Hello AI"}
    # Use the client with stream=True for SSE testing
    with client.stream("POST", "/api/chat", json=payload) as response:
        assert response.status_code == 200
        assert response.headers["content-type"] == "text/event-stream; charset=utf-8"
        
        # Collect the chunks
        chunks = []
        for line in response.iter_lines():
            if line:
                chunks.append(line)
        
        # Verify we received multiple chunks (tokens)
        assert len(chunks) > 0
        # Check if chunks follow the data: <text> pattern
        assert any(chunk.startswith("data: ") for chunk in chunks)
