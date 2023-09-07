from app.models import db, PresetColor, environment, SCHEMA
from sqlalchemy.sql import text
from .data import preset_colors

def seed_preset_colors():
    for color in preset_colors:
        seed_color = PresetColor(
            hex = color['hex'],
            name = color['name'],
            created_at = color['created_at'],
            updated_at = color['updated_at']
        )
        db.session.add(seed_color)

    db.session.commit()

def undo_preset_colors():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.preset_colors RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM preset_colors"))

    db.session.commit()
