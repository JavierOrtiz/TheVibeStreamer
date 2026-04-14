# Project Prompt History

This document records every prompt used to build **TheVibeStreamer**.

## 1. Initial Setup & Architecture
- **Prompt:** "Actúa como un Senior AI Engineer. Hola, necesito que me ayudes a configurar la base de un proyecto. El proyecto se va a llamar **TheVibeStreamer**. Quiero montar un **monorepo** que tenga una carpeta `frontend` con **Next.js** (TypeScript, Tailwind CSS, App Router) y una carpeta `backend` con **Python y FastAPI**. Reglas: inicializa un único repo Git en la raíz, dockeriza todo con `docker-compose` (hot-reload, puertos 3000 y 8000), todo en inglés (código y docs), metodología **TDD** estricta, genera un `README.md` y un `AGENTS.md` con el contexto del prototipo de streaming con LLM."

## 2. First Functional Flow (POST /api/chat & Chat UI)
- **Prompt:** "Genera un endpoint POST /api/chat, donde el frontend enviara un prompt generado por un usuario. En Frontend debemos generar una pequeña home, sencilla, con tailwind, donde el usuario tendra un chat, con un input y un boton de enviar. El usuario enviara un texto en ese input y el backend por ahora solo lo recibira y devolvera 200. Crea los test en Backend y en Frontend para simular este flujo, y despues genera el codigo para cumplir el test TDD."
