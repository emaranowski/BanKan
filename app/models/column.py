from .db import db, environment, SCHEMA, add_prefix_for_prod

class Column(db.Model):
    __tablename__ = 'columns'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('boards.id')), nullable=False)
    card_order = db.Column(db.String)
    # color_hex = db.Column(db.String(30), nullable=False)
    color_name = db.Column(db.String(30), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    def to_dict(self):

        # cards_lst = [card.to_dict() for card in self.cards_rel]
        # card_order_lst = self.card_order.split(',')
        # cards_ordered_lst = []

        # for card_dnd_id in card_order_lst:
        #     for card in cards_lst:
        #         if card_dnd_id == 'card-'+str(card.id):
        #             cards_ordered_lst.append(card)

        return {
            'id': self.id,
            'boardId': self.board_id,
            'cardOrder': self.card_order,
            # 'colorHex': self.color_hex,
            'colorName': self.color_name,
            'title': self.title,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            # 'board': [board.to_dict() for board in self.boards_rel],
            'cards': [card.to_dict() for card in self.cards_rel],
            # 'cards': cards_ordered_lst,
            'dndId': 'column-'+str(self.id),
            'cardDndIds': ['card-'+str(card.id) for card in self.cards_rel]
        }

    # one-to-many: one board can have many columns
    boards_rel = db.relationship("Board", back_populates="columns_rel")

    # one-to-many: one column can have many cards
    cards_rel = db.relationship("Card", back_populates="columns_rel", cascade="all, delete-orphan")
