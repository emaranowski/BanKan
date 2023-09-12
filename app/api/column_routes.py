from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Column, Card
from ..forms.column_form import ColumnForm
from ..forms.card_form import CardForm
import datetime


column_routes = Blueprint('columns', __name__)


@column_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_one_column(id):
    """
    Get details of one column (by column_id): GET /api/columns/:column_id
    """
    # print('***** in get_one_column, id:', id)
    column = Column.query.get(id)
    # print('***** in get_one_column, column:', column)

    if column:
        return column.to_dict()
    else:
        return { "error": "Column could not be found" }, 404


@column_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_column(id):
    """
    Update column (by column_id): PUT /api/columns/:column_id/update
    """
    print('**** in update_column, id:', id)
    form = ColumnForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        column_to_update = Column.query.get(id)
        print('**** in update_column, column_to_update:', column_to_update)
        column_to_update.board_id = form.data['board_id']
        column_to_update.card_order = form.data['card_order']
        # column_to_update.color_hex = form.data['color_hex']
        column_to_update.color_name = form.data['color_name']
        column_to_update.title = form.data['title']
        column_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        res = column_to_update.to_dict()
        return res
    if form.errors:
        res = { "errors": form.errors }
        print('**** in update_column, res:', res)
        return res, 400


@column_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_column(id):
    """
    Delete one column (by column_id): DELETE /api/columns/:column_id/delete
    """
    column_to_delete = Column.query.get(id)
    db.session.delete(column_to_delete)
    db.session.commit()
    column_to_delete = Column.query.get(id)
    if column_to_delete == None:
        return {
        "message": "Successfully deleted column",
        "id": id
        }
    else:
        return {"error": "Column could not be deleted"}


@column_routes.route('/<int:id>/cards', methods=['GET'])
@login_required
def get_all_cards_for_column(id):
    """
    Get all cards for column (by column_id): GET /api/columns/:column_id/cards
    """
    cards = Card.query.filter(Card.column_id == id).all()
    return { "cards": [card.to_dict() for card in cards] }


@column_routes.route('/<int:id>/cards/create', methods=['POST'])
@login_required
def create_card_for_column(id):
    """
    Create card for column (by column_id): POST /api/columns/:column_id/cards/create
    """
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_card = Card(
            column_id = id,
            index = form.data['index'],
            title = form.data['title'],
            description = form.data['description'],
            created_at = datetime.datetime.now(),
            updated_at = datetime.datetime.now()
        )
        db.session.add(new_card)
        db.session.commit()
        return new_card.to_dict()
    if form.errors:
        return { "errors": form.errors }, 400
