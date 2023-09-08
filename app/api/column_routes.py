from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Column
from ..forms.column_form import ColumnForm
import datetime


column_routes = Blueprint('columns', __name__)


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
        column_to_update.color_hex = form.data['color_hex']
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
