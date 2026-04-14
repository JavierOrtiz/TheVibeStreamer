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

### 1. Build and Start the Containers

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

## Development Mandates (TDD)

This project strictly follows the **Red-Green-Refactor** cycle:
1. Write a failing test for the desired functionality.
2. Write the minimum code necessary to make the test pass.
3. Refactor while ensuring tests remain green.
