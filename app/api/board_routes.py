from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Board, Column
from ..forms.board_form import BoardForm
from ..forms.column_form import ColumnForm
import datetime


board_routes = Blueprint("boards", __name__)


@board_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_one_board(id):
    """
    Get details of one board (by board_id):
    GET /api/boards/:board_id
    """
    board = Board.query.get(id)

    if board:
        return board.to_dict()
    else:
        return {"error": "Board could not be found"}, 404


@board_routes.route("/user/<int:id>", methods=["GET"])
@login_required
def get_all_boards(id):
    """
    Get all boards for user (by user_id):
    GET /api/boards/user/:user_id
    """
    boards = Board.query.filter(Board.user_id == id).all()
    return {"boards": [board.to_dict() for board in boards]}


@board_routes.route("/create/user/<int:id>", methods=["POST"])
@login_required
def create_board(id):
    """
    Create board for user (by user_id):
    POST /api/boards/create/user/:user_id
    """
    form = BoardForm()  # create instance of BoardForm class
    # check that CSRF token used in form submission matches token from user's browser
    # to prevent reqs from being submitted on behalf of user (by unauthorized/malicious user)
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if req method is POST & form data passes BoardForm validations
    if form.validate_on_submit():
        new_board = Board(  # create board
            user_id=id,
            title=form.data["title"],
            image_url=form.data["image_url"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        db.session.add(new_board)  # add board to SQLAlchemy session/staging area
        db.session.commit()  # persist board to DB
        return new_board.to_dict()
    if form.errors:  # return 400 'bad request' & errors as dict
        return {"errors": form.errors}, 400


@board_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_board(id):
    """
    Update board (by board_id):
    PUT /api/boards/:board_id/update
    """
    form = BoardForm()  # create instance of BoardForm class
    # check that CSRF tokens match between form submission and user browser
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if req method is PUT & form data passes BoardForm validations
    if form.validate_on_submit():
        board_to_update = Board.query.get(id)  # get board, then update fields
        board_to_update.user_id = form.data["user_id"]
        board_to_update.image_url = form.data["image_url"]
        board_to_update.title = form.data["title"]
        board_to_update.updated_at = datetime.datetime.now()
        db.session.commit()  # persist changes to DB
        res = board_to_update.to_dict()
        return res
    if form.errors:  # return 400 'bad request' & errors as dict
        res = {"errors": form.errors}
        return res, 400


@board_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_board(id):
    """
    Delete one board (by board_id):
    DELETE /api/boards/:board_id/delete
    """
    board_to_delete = Board.query.get(id)  # get board
    db.session.delete(
        board_to_delete
    )  # delete board in SQLAlchemy session/staging area
    db.session.commit()  # persist deletion to DB
    board_to_delete = Board.query.get(id)  # try to get board again

    if board_to_delete == None:  # if board no longer exists
        return {"message": "Successfully deleted board", "id": id}
    else:  # if board still exists
        return {"error": "Board could not be deleted"}


@board_routes.route("/<int:id>/columns", methods=["GET"])
@login_required
def get_all_columns_for_board(id):
    """
    Get all columns for board (by board_id):
    GET /api/boards/:board_id/columns
    """
    # get all columns where board_id matches id from params
    columns = Column.query.filter(Column.board_id == id).all()
    return {"columns": [column.to_dict() for column in columns]}


@board_routes.route("/<int:id>/columns/create", methods=["POST"])
@login_required
def create_column_for_board(id):
    """
    Create column for board (by board_id):
    POST /api/boards/:board_id/columns/create
    """
    form = ColumnForm()  # create instance of ColumnForm class
    # check that CSRF tokens match between form submission and user browser
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if req method is POST & form data passes ColumnForm validations
    if form.validate_on_submit():
        new_column = Column(  # create column
            board_id=id,
            card_order=form.data["card_order"],
            color_name=form.data["color_name"],
            title=form.data["title"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        db.session.add(new_column)  # add column to SQLAlchemy session/staging area
        db.session.commit()  # persist new column to database
        return new_column.to_dict()
    if form.errors:  # return 400 'bad request' & errors as dict
        return {"errors": form.errors}, 400


@board_routes.route("/<int:id>/cards", methods=["GET"])
@login_required
def get_all_cards_for_board(id):
    """
    Get all cards for board (by board_id):
    GET /api/boards/:board_id/cards
    """
    # get all columns where board_id matches id from params
    columns = Column.query.filter(Column.board_id == id).all()
    cards = []  # list to hold cards

    for column in columns:  # for each column in board
        col_to_dict = column.to_dict()
        cards_to_loop = col_to_dict["cards"]

        for card in cards_to_loop:  # for each card in column
            cards.append(card)  # add card to cards list

    return {"cards": cards}
