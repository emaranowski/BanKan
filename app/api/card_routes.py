from flask import Blueprint, request
from flask_login import login_required
from app.models import db, Card
from ..forms.card_form import CardForm
import datetime


card_routes = Blueprint("cards", __name__)


@card_routes.route("/<int:id>/update", methods=["PUT"])
@login_required
def update_card(id):
    """
    Update card (by card_id): PUT /api/cards/:card_id/update
    """
    form = CardForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        card_to_update = Card.query.get(id)
        card_to_update.column_id = form.data["column_id"]
        card_to_update.index = form.data["index"]
        card_to_update.title = form.data["title"]
        card_to_update.description = form.data["description"]
        card_to_update.updated_at = datetime.datetime.now()
        db.session.commit()
        res = card_to_update.to_dict()
        return res
    if form.errors:
        res = {"errors": form.errors}
        return res, 400


@card_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_card(id):
    """
    Delete one card (by card_id): DELETE /api/cards/:card_id/delete
    """
    card_to_delete = Card.query.get(id)
    db.session.delete(card_to_delete)
    db.session.commit()
    card_to_delete = Card.query.get(id)
    if card_to_delete == None:
        return {"message": "Successfully deleted card", "id": id}
    else:
        return {"error": "Card could not be deleted"}
