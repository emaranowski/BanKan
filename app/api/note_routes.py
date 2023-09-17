from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Note
from ..forms.note_form import NoteForm
import datetime


note_routes = Blueprint('notes', __name__)


@note_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_note(id):
    """
    Update note (by note_id): PUT /api/notes/:note_id/update
    """
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note_to_update = Note.query.get(id)
        note_to_update.notebook_id = form.data['notebook_id']
        note_to_update.color_name = form.data['color_name']
        note_to_update.title = form.data['title']
        note_to_update.text = form.data['text']
        note_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        return note_to_update.to_dict()
    if form.errors:
        return { "errors": form.errors }, 400


@note_routes.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_note(id):
    """
    Delete one note (by note_id): DELETE /api/notes/:note_id/delete
    """
    note_to_delete = Note.query.get(id)
    db.session.delete(note_to_delete)
    db.session.commit()
    note_to_delete = Note.query.get(id)
    if note_to_delete == None:
        return {
        "message": "Successfully deleted note",
        "id": id
        }
    else:
        return {"error": "Note could not be deleted"}
