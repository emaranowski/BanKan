from .db import db, environment, SCHEMA, add_prefix_for_prod

class Card(db.Model):
    __tablename__ = 'cards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    column_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('columns.id')), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'columnId': self.column_id,
            'title': self.title,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'column': self.columns_rel
        }

    # one-to-many: one column can have many cards
    columns_rel = db.relationship("Column", back_populates="cards_rel")
