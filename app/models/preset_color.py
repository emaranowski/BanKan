from .db import db, environment, SCHEMA

class PresetColor(db.Model):
    __tablename__ = 'preset_colors'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    hex = db.Column(db.String(7), nullable=False)
    name = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'hex': self.hex,
            'name': self.name,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    # one-to-many: one preset color can have many columns
    # columns_rel = db.relationship("Column", back_populates="preset_colors_rel")
