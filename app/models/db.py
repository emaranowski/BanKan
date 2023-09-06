from flask_sqlalchemy import SQLAlchemy

# import os, and set variable to access flask environment
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


db = SQLAlchemy()

# helper function to add prefix to foreign key column refs in production
# EX: if a table has user_id col that refs users.id, you'd want FK as: db.ForeignKey(f"{SCHEMA}.users.id")
# helper function to add prefix to table names in production environment only
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr
