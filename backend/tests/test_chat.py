from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_chat_endpoint_returns_ack():
    payload = {"message": "Hello AI"}
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    assert response.json() == {"status": "ack"}
