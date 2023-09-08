from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Column
from ..forms.column_form import ColumnForm
import datetime


column_routes = Blueprint('columns', __name__)


# @column_routes.route('/board/<int:id>', methods=['GET'])
# @login_required
# def get_all_columns_for_one_board(id):
#     """
#     Get all columns for one board (by board_id): GET /api/columns/board/:board_id
#     """
#     columns = Column.query.filter(Column.board_id == id).all()
#     return { "columns": [column.to_dict() for column in columns] }
