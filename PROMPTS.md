# Project Prompt History

This document records every prompt used to build **TheVibeStreamer**.

## 1. Initial Setup & Architecture
- **Prompt:** "Actúa como un Senior AI Engineer. Hola, necesito que me ayudes a configurar la base de un proyecto. El proyecto se va a llamar **TheVibeStreamer**. Quiero montar un **monorepo** que tenga una carpeta `frontend` con **Next.js** (TypeScript, Tailwind CSS, App Router) y una carpeta `backend` con **Python y FastAPI**. Reglas: inicializa un único repo Git en la raíz, dockeriza todo con `docker-compose` (hot-reload, puertos 3000 y 8000), todo en inglés (código y docs), metodología **TDD** estricta, genera un `README.md` y un `AGENTS.md` con el contexto del prototipo de streaming con LLM."

## 2. First Functional Flow (POST /api/chat & Chat UI)
- **Prompt:** "Genera un endpoint POST /api/chat, donde el frontend enviara un prompt generado por un usuario. En Frontend debemos generar una pequeña home, sencilla, con tailwind, donde el usuario tendra un chat, con un input y un boton de enviar. El usuario enviara un texto en ese input y el backend por ahora solo lo recibira y devolvera ack. Crea los test en Backend y en Frontend para simular este flujo, y despues genera el codigo para cumplir el test TDD."

## 3. Streaming Chat Backend (DDD + TDD)
- **Prompt:** "Implementa la fase backend de un chat con streaming en FastAPI. Quiero que POST /api/chat reciba el prompt del usuario y responda como stream SSE, enviando la respuesta palabra por palabra con una pequeña pausa para simular latencia. Quiero además que lo estructures con un enfoque DDD, de forma simple pero clara, para aislar el proceso: - Dominio: lógica de generación/streaming del mensaje. - Aplicación: caso de uso para orquestar el streaming a partir del prompt. - Infraestructura/API: endpoint FastAPI y adaptadores necesarios. La idea es evitar lógica de negocio pegada al endpoint y dejar una base mantenible para luego cambiar el proveedor LLM sin romper la capa de dominio. Trabaja con TDD: primero ajusta/crea la prueba en test_chat.py para reflejar este nuevo comportamiento, y luego implementa lo mínimo en main.py para que pase. Mantén el endpoint raíz funcionando y deja el código limpio y sencillo. Resultado esperado: el endpoint de chat responde en text/event-stream y la prueba de backend queda positiva."

## 4. Streaming Chat Frontend (TDD)
- **Prompt:** "Ahora implementa la fase frontend en Next.js. El backend ya envía SSE, así que necesito que el proxy route.ts preserve ese streaming y no convierta la respuesta a JSON. Después, actualiza la UI en page.tsx para leer el stream en tiempo real y mostrar la respuesta del asistente de forma progresiva, como un chat que escribe palabra por palabra. También ajusta los tests de home.test.tsx con enfoque TDD para validar ese comportamiento incremental. Resultado esperado: al enviar un mensaje, la respuesta aparece en vivo en pantalla y las pruebas de frontend quedan positivas."

## 5. UI Improvements & Interaction Logic (TDD)
- **Prompt:** "Mejora la interfaz del chat, vamos a implementar un borrado del input cuando el usuario hace submit. Quiero que los estilos del chat sean mas oscuros, teniendo cuidado con los textos para que sean legibles en todo momento. Cuando se esta renderizando el mensaje del stream, debemos bloquear el boton de enviar para no permitir mas envios hasta que el stream termina de renderizar, añade un loader para representar esa pausa."
