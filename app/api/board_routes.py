from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Board, db
from ..forms.board_form import BoardForm
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

    if board.id:
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
            image_id = form.data['image_id'],
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
    form = BoardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        board_to_update = Board.query.get(id)
        board_to_update.title = form.data['title']
        board_to_update.image_url = form.data['image_url']
        board_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        return board_to_update.to_dict()
    if form.errors:
        return { "errors": form.errors }, 400


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
