from .db import db, environment, SCHEMA, add_prefix_for_prod

class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(30), nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    updated_at = db.Column(db.Date, nullable=False)

    # def columns_dnd(self):
    #     return {
    #         ['column-'+str(column.id) for column in self.columns_rel]
    #     }

    def to_dict(self):

        columns = [column.to_dict() for column in self.columns_rel]
        dnd_id = 'board-'+str(self.id)
        column_dnd_ids = ['column-'+str(column.id) for column in self.columns_rel]

        # def normalized_columns_dnd(column_dnd_ids, columns):
        #     # return ['column-'+str(column.id) for column in self.columns_rel]
        #     normalized_dict = {}
        #     for column_dnd_id in column_dnd_ids:
        #         normalized_dict[column_dnd_id] = {}
        #     # for column in columns:
        #     #     normalized_dict[column.id] = column
        #     return normalized_dict

        # def normalized_columns_dnd(column_dnd_ids, columns_dnd):
        #     # return ['column-'+str(column.id) for column in self.columns_rel]
        #     normalized_dict = {}
        #     for column_dnd_id, column_dnd in column_dnd_ids, columns:
        #         normalized_dict[column_dnd_id] = column_dnd
        #     return normalized_dict

        # columns_dnd = {
        #     ['column_dnd_id': column for column_dnd_id and column in column_dnd_ids and columns_dnd]
        # }

        # columns_dnd = normalized_columns_dnd(column_dnd_ids, columns)

        return {
            'id': self.id,
            'userId': self.user_id,
            'imageUrl': self.image_url,
            'title': self.title,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            # 'user': [user.to_dict() for user in self.users_rel],
            'columns': columns,
            'dndId': dnd_id,
            'columnDndIds': column_dnd_ids,
            # 'board-'+str(self.id): {
            #     'id': 'board-'+str(self.id),
            # },
            # 'columnsDnd': normalized_columns_dnd(column_dnd_ids, columns)
        }

    # one-to-many: one user can have many boards
    users_rel = db.relationship("User", back_populates="boards_rel")

    # one-to-many: one board can have many columns
    columns_rel = db.relationship("Column", back_populates="boards_rel", cascade="all, delete-orphan")
