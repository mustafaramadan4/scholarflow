import asyncio
import uuid
from datetime import datetime, timedelta
from passlib.context import CryptContext
from app.db import AsyncSessionLocal
from app.models import Scholarship, User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

users_data = [
    {"email": "student@scholarflow.com", "password": "123abc", "name": "Demo Student", "role": "student"},
]

scholarships_data = [
    {"title": "Future STEM Leaders Scholarship", "description": "A $5,000 award for high school seniors pursuing degrees in Science, Technology, Engineering, or Math.", "amount_min": 1000, "amount_max": 5000, "is_local": False},
    {"title": "Community Arts Grant", "description": "Supporting local artists and musicians with financial aid for conservatory programs.", "amount_min": 500, "amount_max": 2500, "is_local": True},
    {"title": "Global Innovators Fellowship", "description": "For students with a track record of social entrepreneurship and global impact.", "amount_min": 10000, "amount_max": 10000, "is_local": False},
    {"title": "Women in Tech Scholarship", "description": "Empowering the next generation of female software engineers and data scientists.", "amount_min": 2000, "amount_max": 4000, "is_local": False}
]

async def seed():
    async with AsyncSessionLocal() as session:
        print("--- Seeding Users ---")
        for u in users_data:
            hashed = pwd_context.hash(u["password"])
            user = User(id=uuid.uuid4(), email=u['email'], password_hash=hashed, name=u['name'], role=u['role'])
            session.add(user)

        print("--- Seeding Scholarships ---")
        for s in scholarships_data:
            scholarship = Scholarship(
                id=uuid.uuid4(), title=s["title"], description=s["description"],
                amount_min=s["amount_min"], amount_max=s["amount_max"],
                is_local=s["is_local"], deadline=datetime.now() + timedelta(days=90)
            )
            session.add(scholarship)
        
        await session.commit()
        print("SUCCESS: Database seeded.")

if __name__ == "__main__":
    asyncio.run(seed())
