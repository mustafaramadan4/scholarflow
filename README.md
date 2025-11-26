
# ScholarFlow (scaffold)

This repo contains a minimal scaffold for ScholarFlow:

- backend: FastAPI app (simplified) in `backend/app`
- frontend: Next.js demo app in `frontend`
- docker-compose to run a local Postgres, backend, and frontend

## Quick start (dev)
1. Ensure Docker and Docker Compose are installed.
2. From the project root:
   ```
   docker compose up --build
   ```
3. Backend: http://localhost:8000
4. Frontend: http://localhost:3000

## Notes
- The backend creates tables on startup (for development). Replace with alembic migrations for production.
- The essay generation endpoint is a stub; integrate OpenAI or another LLM for real drafts.
- Replace SECRET_KEY and DATABASE_URL in `backend/.env.example`.
