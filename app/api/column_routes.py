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
    # print('**** in update_column, id:', id)
    form = ColumnForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        column_to_update = Column.query.get(id)
        # print('**** in update_column, column_to_update:', column_to_update)
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
        # print('**** in update_column, res:', res)
        return res, 400


@column_routes.route('/update-two-columns', methods=['PUT'])
@login_required
def update_two_columns():
    """
    Update two columns (by column_ids): PUT /api/columns/update-two-columns
    """
    form1 = ColumnForm()
    form1['csrf_token'].data = request.cookies['csrf_token']
    form2 = ColumnForm()
    form2['csrf_token'].data = request.cookies['csrf_token']
    # body = request.body

    # print('*******************')
    # print('*******************')
    # print('*******************')
    # print('*******************')
    # print('*******************')

    # print("**** in update_two_columns, form1.data", form1.data)
    # print("**** in update_two_columns, form2.data",  form2.data)
    # print('**** in update_two_columns, request.body:', request.body)
    # print('**** in update_two_columns, request.body:', request.body)
    # print('**** in update_two_columns, request.body:', request.body)
    # return

    id_src_res = {}
    id_dest_res = {}

    if form1.validate_on_submit():
        # print('**** in form1.validate_on_submit #1')
        column_to_update = Column.query.get(form1.data['column_id_src'])
        # print('**** in form1.validate_on_submit #1, column_to_update:', column_to_update)
        column_to_update.board_id = form1.data['board_id_src']
        column_to_update.card_order = form1.data['card_order_src']
        column_to_update.color_name = form1.data['color_name_src']
        column_to_update.title = form1.data['title_src']
        column_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        id_src_res = column_to_update.to_dict()
        # print('**** in form1.validate_on_submit #1, column_to_update:', column_to_update)
        # print('**** in form1.validate_on_submit #1, id_src_res:', id_src_res)
        # return id_src_res
    if form1.errors:
        # print('**** in form1.errors #1')
        id_src_res = { "errors": form1.errors }
        # print('**** in form1.errors #1, id_src_res:', id_src_res)
        # return id_src_res, 400

    if form2.validate_on_submit():
        # print('**** in form2.validate_on_submit #2')
        column_to_update = Column.query.get(form2.data['column_id_dest'])
        # print('**** in form2.validate_on_submit, column_to_update:', column_to_update)
        column_to_update.board_id = form2.data['board_id_dest']
        column_to_update.card_order = form2.data['card_order_dest']
        column_to_update.color_name = form2.data['color_name_dest']
        column_to_update.title = form2.data['title_dest']
        column_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        id_dest_res = column_to_update.to_dict()
        # print('**** in form2.validate_on_submit #2, column_to_update:', column_to_update)
        # print('**** in form2.validate_on_submit #2, id_dest_res:', id_dest_res)
        # return id_dest_res
    if form2.errors:
        # print('**** in form2.errors #2')
        id_dest_res = { "errors": form2.errors }
        # print('**** in form2.errors #2, id_dest_res:', id_dest_res)
        # return id_dest_res, 400

    # print('**** in update_two_columns, id_src_res:', id_src_res)
    # print('**** in update_two_columns, id_dest_res:', id_dest_res)

    if id_src_res.errors and id_dest_res.errors:
        # print('**** in id_src_res.errors and id_dest_res.errors')
        return { id_src_res, id_dest_res }, 400
    else:
        # print('**** in ELSE id_src_res.errors and id_dest_res.errors ELSE')
        return { id_src_res, id_dest_res }


# @column_routes.route('/update-two-columns', methods=['PUT'])
# @login_required
# def update_two_columns():
#     """
#     Update two columns (by column_ids): PUT /api/columns/update-two-columns
#     """
#     form1 = ColumnForm()
#     form1['csrf_token'].data = request.cookies['csrf_token']
#     form2 = ColumnForm()
#     form2['csrf_token'].data = request.cookies['csrf_token']
#     # body = request.body

#     print('*******************')
#     print('*******************')
#     print('*******************')
#     print('*******************')
#     print('*******************')

#     print("**** in update_two_columns, form1.data", form1.data)
#     print("**** in update_two_columns, form2.data",  form2.data)
#     # print('**** in update_two_columns, request.body:', request.body)
#     # print('**** in update_two_columns, request.body:', request.body)
#     # print('**** in update_two_columns, request.body:', request.body)
#     # return

#     id_src_res = {}
#     id_dest_res = {}

#     if form1.validate_on_submit():
#         print('**** in form1.validate_on_submit #1')
#         column_to_update = Column.query.get(form1.data['column_id_src'])
#         print('**** in form1.validate_on_submit #1, column_to_update:', column_to_update)
#         column_to_update.board_id = form1.data['board_id_src']
#         column_to_update.card_order = form1.data['card_order_src']
#         column_to_update.color_name = form1.data['color_name_src']
#         column_to_update.title = form1.data['title_src']
#         column_to_update.updated_at = datetime.datetime.now()
#         db.session.commit()
#         id_src_res = column_to_update.to_dict()
#         print('**** in form1.validate_on_submit #1, column_to_update:', column_to_update)
#         print('**** in form1.validate_on_submit #1, id_src_res:', id_src_res)
#         # return id_src_res
#     if form1.errors:
#         print('**** in form1.errors #1')
#         id_src_res = { "errors": form1.errors }
#         print('**** in form1.errors #1, id_src_res:', id_src_res)
#         # return id_src_res, 400

#     if form2.validate_on_submit():
#         print('**** in form2.validate_on_submit #2')
#         column_to_update = Column.query.get(form2.data['column_id_dest'])
#         print('**** in form2.validate_on_submit, column_to_update:', column_to_update)
#         column_to_update.board_id = form2.data['board_id_dest']
#         column_to_update.card_order = form2.data['card_order_dest']
#         column_to_update.color_name = form2.data['color_name_dest']
#         column_to_update.title = form2.data['title_dest']
#         column_to_update.updated_at = datetime.datetime.now()
#         db.session.commit()
#         id_dest_res = column_to_update.to_dict()
#         print('**** in form2.validate_on_submit #2, column_to_update:', column_to_update)
#         print('**** in form2.validate_on_submit #2, id_dest_res:', id_dest_res)
#         # return id_dest_res
#     if form2.errors:
#         print('**** in form2.errors #2')
#         id_dest_res = { "errors": form2.errors }
#         print('**** in form2.errors #2, id_dest_res:', id_dest_res)
#         # return id_dest_res, 400

#     print('**** in update_two_columns, id_src_res:', id_src_res)
#     print('**** in update_two_columns, id_dest_res:', id_dest_res)

#     if id_src_res.errors and id_dest_res.errors:
#         print('**** in id_src_res.errors and id_dest_res.errors')
#         return { id_src_res, id_dest_res }, 400
#     else:
#         print('**** in ELSE id_src_res.errors and id_dest_res.errors ELSE')
#         return { id_src_res, id_dest_res }


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
