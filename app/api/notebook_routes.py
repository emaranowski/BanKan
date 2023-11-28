from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Notebook, Note
from ..forms.notebook_form import NotebookForm
from ..forms.note_form import NoteForm
import datetime


notebook_routes = Blueprint("notebooks", __name__)


@notebook_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_one_notebook(id):
    """
    Get details of one notebook (by notebook_id): GET /api/notebooks/:notebook_id
    """
    notebook = Notebook.query.get(id)

    if notebook:
        return notebook.to_dict()
    else:
        return {"error": "Notebook could not be found"}, 404


@notebook_routes.route("/user/<int:id>", methods=["GET"])
@login_required
def get_all_notebooks(id):
    """
    Get all notebooks for user (by user_id): GET /api/notebooks/user/:user_id
    """
    notebooks = Notebook.query.filter(Notebook.user_id == id).all()
    return {"notebooks": [notebook.to_dict() for notebook in notebooks]}


@notebook_routes.route("/create/user/<int:id>", methods=["POST"])
@login_required
def create_notebook(id):
    """
    Create notebook for user (by user_id): POST /api/notebooks/create/user/:user_id
    """
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_notebook = Notebook(
            user_id=id,
            image_url=form.data["image_url"],
            title=form.data["title"],
            note_order=form.data["note_order"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        db.session.add(new_notebook)
        db.session.commit()
        return new_notebook.to_dict()
    if form.errors:
        return {"errors": form.errors}, 400


@notebook_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_notebook(id):
    """
    Update notebook (by notebook_id): PUT /api/notebooks/:notebook_id/update
    """
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        notebook_to_update = Notebook.query.get(id)
        notebook_to_update.user_id = form.data["user_id"]
        notebook_to_update.image_url = form.data["image_url"]
        notebook_to_update.title = form.data["title"]
        notebook_to_update.note_order = form.data["note_order"]
        notebook_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        res = notebook_to_update.to_dict()
        return res
    if form.errors:
        res = {"errors": form.errors}
        return res, 400


@notebook_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_notebook(id):
    """
    Delete one notebook (by notebook_id): DELETE /api/notebooks/:notebook_id/delete
    """
    notebook_to_delete = Notebook.query.get(id)
    db.session.delete(notebook_to_delete)
    db.session.commit()
    notebook_to_delete = Notebook.query.get(id)

    if notebook_to_delete == None:
        return {"message": "Successfully deleted notebook", "id": id}
    else:
        return {"error": "Notebook could not be deleted"}


@notebook_routes.route("/<int:id>/notes", methods=["GET"])
@login_required
def get_all_notes_for_notebook(id):
    """
    Get all notes for notebook (by notebook_id): GET /api/notebooks/:notebook_id/notes
    """
    notes = Note.query.filter(Note.notebook_id == id).all()
    return {"notes": [note.to_dict() for note in notes]}


@notebook_routes.route("/<int:id>/notes/create", methods=["POST"])
@login_required
def create_note_for_notebook(id):
    """
    Create note for notebook (by notebook_id): POST /api/notebooks/:notebook_id/notes/create
    """
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_note = Note(
            notebook_id=id,
            color_name=form.data["color_name"],
            title=form.data["title"],
            text=form.data["text"],
            created_at=datetime.datetime.now(),
            updated_at=datetime.datetime.now(),
        )
        db.session.add(new_note)
        db.session.commit()
        return new_note.to_dict()
    if form.errors:
        return {"errors": form.errors}, 400
