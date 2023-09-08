from app.models import db, Column, environment, SCHEMA
from sqlalchemy.sql import text
from .data import columns

def seed_columns():
    for column in columns:
        seed_column = Column(
            board_id = column['board_id'],
            # color_id = column['color_id'],
            color_hex = column['color_hex'],
            title = column['title'],
            created_at = column['created_at'],
            updated_at = column['updated_at']
        )
        db.session.add(seed_column)

    db.session.commit()

def undo_columns():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.columns RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM columns"))

    db.session.commit()
