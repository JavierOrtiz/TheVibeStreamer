# TheVibeStreamer 🌊

A real-time LLM streaming prototype built with Next.js and FastAPI, strictly following **TDD (Test-Driven Development)**.

## Prerequisites

- **Node.js:** v20+ (recommended)
- **Python:** 3.9+
- **npm** or **yarn**

---

## Project Structure

- `/frontend`: Next.js (TypeScript, Tailwind, App Router).
- `/backend`: FastAPI (Python, Asynchronous).

---

## 🐳 Running with Docker (Recommended)

The easiest way to get the project up and running is using Docker Compose. This will orchestrate both the backend and frontend services.

### 1. Configure LLM Provider and API Keys

Before running the project, you must select your LLM provider and provide the corresponding API key. 

Open the `docker-compose.yml` file and update the `backend` environment variables:

```yaml
    environment:
      - LLM_PROVIDER=gemini # Options: gemini, openai, claude
      - GEMINI_API_KEY=your_actual_key
      - OPENAI_API_KEY=your_actual_key
      - ANTHROPIC_API_KEY=your_actual_key
```

### 2. Build and Start the Containers

From the project root directory (`TheVibeStreamer/`), run:

```bash
docker compose up --build
```

- **Hot Reloading:** The project uses volumes, so any changes made to the code on your local machine will automatically update inside the containers.
- **Detached Mode:** To run in the background, use `docker compose up -d`.

### 2. Access the Applications

Once the containers are running, you can access the project at:

- **Frontend (UI):** [http://localhost:3000](http://localhost:3000)
- **Backend (API):** [http://localhost:8000](http://localhost:8000)

### 3. Stopping the Services

To stop and remove the containers:

```bash
docker compose down
```

---

## Backend Setup (Manual)

1. **Navigate to the directory:**
   ```bash
   cd backend
   ```

2. **Create and activate the virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Tests (TDD):**
   ```bash
   pytest
   ```

5. **Start the server:**
   ```bash
   uvicorn main:app --reload
   ```

---

## Frontend Setup

1. **Navigate to the directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run Tests (TDD):**
   ```bash
   npm test
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🚀 Future Iterations

The following features are planned for future development to enhance the platform's capabilities and scalability:

1. **In-Chat Model Selection:** Allow users to switch between LLM providers and specific models directly within the chat interface.
2. **Message Persistence & History:** Implement database storage to persist chat sessions and allow users to revisit their conversation history.
3. **Token Usage Metrics:** Add real-time calculation of token consumption and cost metrics per request/session.
4. **Session Rate Limiting:** Implement message limits per session to control costs and prevent unnecessary token expenditure.
5. **Smart Caching:** Integrate a caching layer for common questions and phrases to reduce latency and minimize redundant model API calls.

---

## Development Mandates (TDD)

This project strictly follows the **Red-Green-Refactor** cycle:
1. Write a failing test for the desired functionality.
2. Write the minimum code necessary to make the test pass.
3. Refactor while ensuring tests remain green.
