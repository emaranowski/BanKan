from .db import db, environment, SCHEMA, add_prefix_for_prod


class Note(db.Model):
    __tablename__ = "notes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    notebook_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("notebooks.id")), nullable=False
    )
    color_name = db.Column(db.String(30), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    text = db.Column(db.String(200))
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        dnd_id = "note-" + str(self.id)

        return {
            "id": self.id,
            "notebookId": self.notebook_id,
            "colorName": self.color_name,
            "title": self.title,
            "text": self.text,
            "dndId": dnd_id,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    # one-to-many: one notebook can have many notes
    notebooks_rel = db.relationship("Notebook", back_populates="notes_rel")
