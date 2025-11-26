# ScholarFlow

ScholarFlow is a scholarship matching and application management system. It connects students with scholarships and uses AI to assist in drafting application essays.

## Architecture Overview

The application is split into a **Next.js Frontend** (Port 3000) and a **FastAPI Backend** (Port 8000).

### Core Data Models
* **`User`**: Authentication and roles.
* **`StudentProfile`**: Academic data (GPA, Major) used for matching.
* **`Scholarship`**: Financial opportunities.
* **`Application`**: Links users to scholarships.

## Startup Checklist

1.  **Build and Start Containers**
    ```bash
    docker compose up --build
    ```

2.  **Seed Dummy Data (Required)**
    The database starts empty. Open a new terminal and run:
    ```bash
    docker compose exec backend python seed.py
    ```
    * **User**: `student@scholarflow.com` / `password123`
    * **Data**: Populates scholarships for search.

3.  **Enable Real AI (Optional)**
    To use GPT-4 instead of the stub, add your API key to `backend/.env` (or `backend/app/core_config.py`):
    ```bash
    OPENAI_API_KEY=sk-your-key-here
    ```
    Then restart the backend.

## Access
* Frontend: http://localhost:3000
* Backend Docs: http://localhost:8000/docs
