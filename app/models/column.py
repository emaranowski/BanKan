from .db import db, environment, SCHEMA, add_prefix_for_prod

class Column(db.Model):
    __tablename__ = 'columns'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    # color_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('preset_colors.id')), nullable=False)
    color_hex = db.Column(db.String(30), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'boardId': self.board_id,
            # 'colorId': self.color_id,
            'colorHex': self.color_hex,
            'title': self.title,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    # one-to-many: one board can have many columns
    boards_rel = db.relationship("Board", back_populates="columns_rel")

    # one-to-many: one preset color can have many columns
    # preset_colors_rel = db.relationship("PresetColor", back_populates="columns_rel")

    # one-to-many: one column can have many cards
    cards_rel = db.relationship("Card", back_populates="columns_rel", cascade="all, delete-orphan")
