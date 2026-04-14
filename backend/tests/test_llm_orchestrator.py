import pytest
import os
from unittest.mock import patch, MagicMock
from app.domain.llm_orchestrator import LLMOrchestrator, LLMProvider, GeminiProvider, OpenAIProvider, ClaudeProvider

def test_orchestrator_returns_gemini_provider_when_env_is_set():
    with patch.dict(os.environ, {"LLM_PROVIDER": "gemini", "GEMINI_API_KEY": "fake_key"}):
        with patch('google.generativeai.configure'), patch('google.generativeai.GenerativeModel'):
            provider = LLMOrchestrator.get_provider()
            assert isinstance(provider, GeminiProvider)

def test_orchestrator_returns_openai_provider_when_env_is_set():
    with patch.dict(os.environ, {"LLM_PROVIDER": "openai", "OPENAI_API_KEY": "fake_key"}):
        with patch('openai.AsyncOpenAI'):
            provider = LLMOrchestrator.get_provider()
            assert isinstance(provider, OpenAIProvider)

def test_orchestrator_returns_claude_provider_when_env_is_set():
    with patch.dict(os.environ, {"LLM_PROVIDER": "claude", "ANTHROPIC_API_KEY": "fake_key"}):
        with patch('anthropic.AsyncAnthropic'):
            provider = LLMOrchestrator.get_provider()
            assert isinstance(provider, ClaudeProvider)

def test_orchestrator_raises_error_for_invalid_provider():
    with patch.dict(os.environ, {"LLM_PROVIDER": "unknown"}):
        with pytest.raises(ValueError, match="Unsupported LLM provider"):
            LLMOrchestrator.get_provider()

def test_orchestrator_raises_error_when_api_key_is_missing():
    with patch.dict(os.environ, {"LLM_PROVIDER": "openai"}, clear=True):
        with pytest.raises(ValueError, match="OPENAI_API_KEY is not set"):
            LLMOrchestrator.get_provider()
