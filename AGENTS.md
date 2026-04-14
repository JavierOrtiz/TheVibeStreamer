# TheVibeStreamer - AI Context & Project Overview

## Goal
Build a functional prototype that allows users to interact with a Large Language Model (LLM) in real-time. The application must provide a fluid user experience through **streaming** and be built on a **scalable architecture**.

## Tech Stack
- **Frontend:** Next.js (TypeScript, Tailwind CSS, App Router).
- **Backend:** Python with FastAPI.
- **Communication:** Streaming via Server-Sent Events (SSE) or WebSockets for real-time LLM responses.

## Project Structure
- `/frontend`: Next.js application handling the UI/UX, chat interface, and streaming state management.
- `/backend`: FastAPI service responsible for LLM orchestration, prompt handling, and streaming tokens to the client.

## Development Mandates
1. **TDD First:** All development MUST follow Test-Driven Development. No production code shall be written without a corresponding failing test case (Red-Green-Refactor cycle).
2. **Prompt Tracking:** EVERY prompt provided by the user MUST be recorded in the `PROMPTS.md` file at the time of execution.
3. **Explicit Commits:** DO NOT generate or suggest commits unless the user explicitly instructs to do so.
4. **Real-time Streaming:** LLM responses should appear word-by-word (or token-by-token) as they are generated.
2. **Interactive UI:** A clean, responsive chat interface built with Tailwind CSS.
3. **Scalable Backend:** FastAPI's asynchronous nature will handle multiple concurrent streaming connections efficiently.
4. **LLM Integration:** Integration with a model provider (OpenAI, Anthropic, or local via LangChain/Ollama).

## Technical Roadmap
1. Implement a basic chat UI in Next.js.
2. Create a FastAPI endpoint that yields simulated stream data.
3. Connect the frontend to consume the stream using the Fetch API (ReadableStream).
4. Integrate a real LLM provider on the backend.
5. Add state management for chat history and session persistence.
