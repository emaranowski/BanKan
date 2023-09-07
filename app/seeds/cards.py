from app.models import db, Card, environment, SCHEMA
from sqlalchemy.sql import text
from .data import cards

def seed_cards():
    for card in cards:
        seed_card = Card(
            column_id = card['column_id'],
            title = card['title'],
            description = card['description'],
            created_at = card['created_at'],
            updated_at = card['updated_at']
        )
        db.session.add(seed_card)

    db.session.commit()

def undo_cards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cards"))

    db.session.commit()
