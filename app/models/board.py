from .db import db, environment, SCHEMA, add_prefix_for_prod


class Board(db.Model):
    __tablename__ = "boards"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False
    )
    image_url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        columns = [column.to_dict() for column in self.columns_rel]
        dnd_id = "board-" + str(self.id)
        column_dnd_ids = ["column-" + str(column.id) for column in self.columns_rel]

        return {
            "id": self.id,
            "userId": self.user_id,
            "imageUrl": self.image_url,
            "title": self.title,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "columns": columns,
            "dndId": dnd_id,
            "columnDndIds": column_dnd_ids,
        }

    # one-to-many: one user can have many boards
    users_rel = db.relationship("User", back_populates="boards_rel")

    # one-to-many: one board can have many columns
    columns_rel = db.relationship(
        "Column", back_populates="boards_rel", cascade="all, delete-orphan"
    )
