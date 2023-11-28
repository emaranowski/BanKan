from .db import db, environment, SCHEMA, add_prefix_for_prod


class Notebook(db.Model):
    __tablename__ = "notebooks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    image_url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    note_order = db.Column(db.String)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        notes = [note.to_dict() for note in self.notes_rel]
        dnd_id = "notebook-" + str(self.id)
        note_dnd_ids = ["note-" + str(note.id) for note in self.notes_rel]

        return {
            "id": self.id,
            "userId": self.user_id,
            "imageUrl": self.image_url,
            "title": self.title,
            "noteOrder": self.note_order,
            "notes": notes,
            "dndId": dnd_id,
            "noteDndIds": note_dnd_ids,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    # one-to-many: one user can have many notebooks
    users_rel = db.relationship("User", back_populates="notebooks_rel")

    # one-to-many: one notebook can have many notes
    notes_rel = db.relationship(
        "Note", back_populates="notebooks_rel", cascade="all, delete-orphan"
    )
