from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text
from .data import boards

def seed_boards():
    for board in boards:
        seed_board = Board(
            user_id = board['user_id'],
            # image_id = board['image_id'],
            image_url = board['image_url'],
            title = board['title'],
            created_at = board['created_at'],
            updated_at = board['updated_at']
        )
        db.session.add(seed_board)

    db.session.commit()

def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
