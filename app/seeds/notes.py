from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text
from .data import notes

def seed_notes():
    for note in notes:
        seed_note = Note(
            notebook_id = note['notebook_id'],
            color_name = note['color_name'],
            title = note['title'],
            text = note['text'],
            created_at = note['created_at'],
            updated_at = note['updated_at']
        )
        db.session.add(seed_note)

    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
