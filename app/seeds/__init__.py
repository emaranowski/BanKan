from flask.cli import AppGroup
from .users import seed_users, undo_users
from .boards import seed_boards, undo_boards
from .preset_images import seed_preset_images, undo_preset_images
from .columns import seed_columns, undo_columns
from .preset_colors import seed_preset_colors, undo_preset_colors
from .cards import seed_cards, undo_cards
from .notebooks import seed_notebooks, undo_notebooks
from .notes import seed_notes, undo_notes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding, truncate all tables prefixed with schema name
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        # Add a truncate command here for every table that will be seeded.
        db.session.commit()
        # Before seeding in production, you want to run the seed undo command,
        # which will truncate all tables prefixed with the schema name
        # (see comment in users.py undo_users function).
        # Make sure to add all your other models' undo functions below
        # undo_cards()
        # undo_columns()
        # undo_preset_colors()
        # undo_boards()
        # undo_preset_images()
        # undo_users()
    seed_users()
    seed_preset_images()
    seed_boards()
    seed_preset_colors()
    seed_columns()
    seed_cards()
    seed_notebooks()
    seed_notes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_notes()
    undo_notebooks()
    undo_cards()
    undo_columns()
    undo_preset_colors()
    undo_boards()
    undo_preset_images()
    undo_users()
    # Add other undo functions here
