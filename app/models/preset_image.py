from .db import db, environment, SCHEMA

class PresetImage(db.Model):
    __tablename__ = 'preset_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }

    # one-to-many: one preset image can have many boards
    boards_rel = db.relationship("Board", back_populates="preset_images_rel")
