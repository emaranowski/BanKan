from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Column, Card
from ..forms.column_form import ColumnForm
from ..forms.card_form import CardForm
import datetime


column_routes = Blueprint("columns", __name__)


@column_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_one_column(id):
    """
    Get details of one column (by column_id):
    GET /api/columns/:column_id
    """
    column = Column.query.get(id)  # get column

    if column:  # if found
        return column.to_dict()
    else:  # return 404 'not found' & error message
        return {"error": "Column could not be found"}, 404


@column_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_column(id):
    """
    Update column (by column_id):
    PUT /api/columns/:column_id/update
    """
    form = ColumnForm()  # create instance of ColumnForm class
    # check that CSRF tokens match between form submission and user browser
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if req method is PUT & form data passes ColumnForm validations
    if form.validate_on_submit():
        column_to_update = Column.query.get(id)  # get column, then update it
        column_to_update.board_id = form.data["board_id"]
        column_to_update.card_order = form.data["card_order"]
        # column_to_update.color_hex = form.data['color_hex']
        column_to_update.color_name = form.data["color_name"]
        column_to_update.title = form.data["title"]
        column_to_update.updated_at = datetime.datetime.now()
        db.session.commit()  # persist column updates to DB
        res = column_to_update.to_dict()
        return res
    if form.errors:  # return 400 'bad request' & errors as dict
        res = {"errors": form.errors}
        return res, 400


@column_routes.route("/update-two-columns", methods=["PUT"])
@login_required
def update_two_columns():
    """
    Update two columns (by column_ids),
    used when dropping a card from one column to another column:
    PUT /api/columns/update-two-columns
    """
    form1 = ColumnForm()  # create 1st instance of ColumnForm class
    form1["csrf_token"].data = request.cookies["csrf_token"]

    form2 = ColumnForm()  # create 2nd instance of ColumnForm class
    form2["csrf_token"].data = request.cookies["csrf_token"]

    id_src_res = {}  # response for source column (where card was moved from)
    id_dest_res = {}  # response for destination column (where card was moved to)

    # if req method is PUT & form data passes ColumnForm validations
    if form1.validate_on_submit():  # get source column, then update its card_order
        column_to_update = Column.query.get(form1.data["column_id_src"])
        column_to_update.board_id = form1.data["board_id_src"]
        column_to_update.card_order = form1.data["card_order_src"]
        column_to_update.color_name = form1.data["color_name_src"]
        column_to_update.title = form1.data["title_src"]
        column_to_update.updated_at = datetime.datetime.now()
        db.session.commit()  # persist column updates to DB
        id_src_res = column_to_update.to_dict()  # assign as column_to_update dict
    if form1.errors:
        id_src_res = {"errors": form1.errors}  # assign as errors dict

    # if req method is PUT & form data passes ColumnForm validations
    if form2.validate_on_submit():  # get destination column, then update its card_order
        column_to_update = Column.query.get(form2.data["column_id_dest"])
        column_to_update.board_id = form2.data["board_id_dest"]
        column_to_update.card_order = form2.data["card_order_dest"]
        column_to_update.color_name = form2.data["color_name_dest"]
        column_to_update.title = form2.data["title_dest"]
        column_to_update.updated_at = datetime.datetime.now()
        db.session.commit()  # persist column updates to DB
        id_dest_res = column_to_update.to_dict()  # assign as column_to_update dict
    if form2.errors:
        id_dest_res = {"errors": form2.errors}  # assign as errors dict

    # if errors when updating columns
    if id_src_res.errors and id_dest_res.errors:
        return {id_src_res, id_dest_res}, 400
    else:  # if updates succeeded
        return {id_src_res, id_dest_res}


@column_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_column(id):
    """
    Delete one column (by column_id):
    DELETE /api/columns/:column_id/delete
    """
    column_to_delete = Column.query.get(id)  # get column
    db.session.delete(
        column_to_delete
    )  # delete column in SQLAlchemy session/staging area
    db.session.commit()  # persist deletion to DB
    column_to_delete = Column.query.get(id)  # try to get column again

    if column_to_delete == None:  # if deletion succeeded
        return {"message": "Successfully deleted column", "id": id}
    else:  # if deletion failed
        return {"error": "Column could not be deleted"}


@column_routes.route("/<int:id>/cards", methods=["GET"])
@login_required
def get_all_cards_for_column(id):
    """
    Get all cards for column (by column_id):
    GET /api/columns/:column_id/cards
    """
    # get all cards where column_id matches id from params
    cards = Card.query.filter(Card.column_id == id).all()
    return {"cards": [card.to_dict() for card in cards]}  # list of cards


@column_routes.route("/<int:id>/cards/create", methods=["POST"])
@login_required
def create_card_for_column(id):
    """
    Create card for column (by column_id):
    POST /api/columns/:column_id/cards/create
    """
    form = CardForm()  # create instance of CardForm class
    # check that CSRF tokens match between form submission and user browser
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if req method is POST & form data passes CardForm validations
    if form.validate_on_submit():
        new_card = Card(  # create card
            column_id=id,
            index=form.data["index"],
            title=form.data["title"],
            description=form.data["description"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        db.session.add(new_card)  # add card to SQLAlchemy session/staging area
        db.session.commit()  # persist new card to database
        return new_card.to_dict()
    if form.errors:  # return 400 'bad request' & errors as dict
        return {"errors": form.errors}, 400
