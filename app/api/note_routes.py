from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Note
from ..forms.note_form import NoteForm
import datetime


note_routes = Blueprint("notes", __name__)


@note_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_note(id):
    """
    Update note (by note_id):
    PUT /api/notes/:note_id/update
    """
    form = NoteForm()  # create instance of NoteForm class
    # check that CSRF tokens match between form submission and user browser
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if req method is PUT & form data passes NoteForm validations
    if form.validate_on_submit():
        note_to_update = Note.query.get(id)  # get note, then update it
        note_to_update.notebook_id = form.data["notebook_id"]
        note_to_update.color_name = form.data["color_name"]
        note_to_update.title = form.data["title"]
        note_to_update.text = form.data["text"]
        note_to_update.updated_at = datetime.datetime.now()
        db.session.commit()  # persist note updates to database
        return note_to_update.to_dict()
    if form.errors:  # return 400 'bad request' & errors as dict
        return {"errors": form.errors}, 400


@note_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_note(id):
    """
    Delete one note (by note_id):
    DELETE /api/notes/:note_id/delete
    """
    note_to_delete = Note.query.get(id)  # get note
    db.session.delete(note_to_delete)  # delete note in SQLAlchemy session/staging area
    db.session.commit()  # persist deletion to DB
    note_to_delete = Note.query.get(id)  # try to get note again

    if note_to_delete == None:  # if deletion succeeded
        return {"message": "Successfully deleted note", "id": id}
    else:  # if deletion failed
        return {"error": "Note could not be deleted"}
