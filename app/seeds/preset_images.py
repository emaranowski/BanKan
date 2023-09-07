from app.models import db, PresetImage, environment, SCHEMA
from sqlalchemy.sql import text
from .data import preset_images

def seed_preset_images():
    for image in preset_images:
        seed_image = PresetImage(
            url = image['url'],
            created_at = image['created_at'],
            updated_at = image['updated_at']
        )
        db.session.add(seed_image)

    db.session.commit()

def undo_preset_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.preset_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM preset_images"))

    db.session.commit()
