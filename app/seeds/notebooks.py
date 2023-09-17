from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text
from .data import notebooks

def seed_notebooks():
    for notebook in notebooks:
        seed_notebook = Notebook(
            user_id = notebook['user_id'],
            image_url = notebook['image_url'],
            title = notebook['title'],
            note_order = notebook['note_order'],
            created_at = notebook['created_at'],
            updated_at = notebook['updated_at']
        )
        db.session.add(seed_notebook)

    db.session.commit()

def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
