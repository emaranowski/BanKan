from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Board, Column
from ..forms.board_form import BoardForm
from ..forms.column_form import ColumnForm
import datetime


board_routes = Blueprint('boards', __name__)


@board_routes.route('/<int:id>', methods=['GET'])
@login_required
def get_one_board(id):
    """
    Get details of one board (by board_id): GET /api/boards/:board_id
    """
    # print('***** in get_one_board, id:', id)
    board = Board.query.get(id)
    # print('***** in get_one_board, board:', board)

    if board:
        return board.to_dict()
    else:
        return { "error": "Board could not be found" }, 404


@board_routes.route('/user/<int:id>', methods=['GET'])
@login_required
def get_all_boards(id):
    """
    Get all boards for user (by user_id): GET /api/boards/user/:user_id
    """
    boards = Board.query.filter(Board.user_id == id).all()
    return { "boards": [board.to_dict() for board in boards] }


@board_routes.route('/create/user/<int:id>', methods=['POST'])
@login_required
def create_board(id):
    """
    Create board for user (by user_id): POST /api/boards/create/user/:user_id
    """
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_board = Board(
            user_id = id,
            title = form.data['title'],
            image_url = form.data['image_url'],
            created_at = datetime.datetime.now(),
            updated_at = datetime.datetime.now()
        )
        db.session.add(new_board)
        db.session.commit()
        return new_board.to_dict()
    if form.errors:
        return { "errors": form.errors }, 400


@board_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_board(id):
    """
    Update board (by board_id): PUT /api/boards/:board_id/update
    """
    print('**** in update_board, id:', id)
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        board_to_update = Board.query.get(id)
        print('**** in update_board, board_to_update:', board_to_update)
        board_to_update.user_id = form.data['user_id']
        board_to_update.image_url = form.data['image_url']
        board_to_update.title = form.data['title']
        board_to_update.updated_at = datetime.datetime.now()
        # board_to_update.updated_at = func.now()
        db.session.commit()
        res = board_to_update.to_dict()
        return res
    if form.errors:
        res = { "errors": form.errors }
        print('**** in update_board, res:', res)
        return res, 400


@board_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_board(id):
    """
    Delete one board (by board_id): DELETE /api/boards/:board_id/delete
    """
    board_to_delete = Board.query.get(id)
    db.session.delete(board_to_delete)
    db.session.commit()
    board_to_delete = Board.query.get(id)
    if board_to_delete == None:
        return {
        "message": "Successfully deleted board",
        "id": id
        }
    else:
        return {"error": "Board could not be deleted"}


@board_routes.route('/<int:id>/columns', methods=['GET'])
@login_required
def get_all_columns_for_board(id):
    """
    Get all columns for board (by board_id): GET /api/boards/:board_id/columns
    """
    columns = Column.query.filter(Column.board_id == id).all()
    return { "columns": [column.to_dict() for column in columns] }


@board_routes.route('/<int:id>/columns/create', methods=['POST'])
@login_required
def create_column_for_board(id):
    """
    Create column for board (by board_id): POST /api/boards/:board_id/columns/create
    """
    form = ColumnForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_column = Column(
            board_id = id,
            # color_hex = form.data['color_hex'],
            color_name = form.data['color_name'],
            title = form.data['title'],
            created_at = datetime.datetime.now(),
            updated_at = datetime.datetime.now()
        )
        db.session.add(new_column)
        db.session.commit()
        return new_column.to_dict()
    if form.errors:
        return { "errors": form.errors }, 400
