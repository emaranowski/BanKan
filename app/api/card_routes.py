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
    Update card (by card_id):
    PUT /api/cards/:card_id/update
    """
    form = CardForm()  # create instance of CardForm class
    # check that CSRF tokens match between form submission and user browser
    form["csrf_token"].data = request.cookies["csrf_token"]

    # if req method is PUT & form data passes CardForm validations
    if form.validate_on_submit():
        card_to_update = Card.query.get(id)  # get card, then update it
        card_to_update.column_id = form.data["column_id"]
        card_to_update.index = form.data["index"]
        card_to_update.title = form.data["title"]
        card_to_update.description = form.data["description"]
        card_to_update.updated_at = datetime.datetime.now()
        db.session.commit()  # persist card updates to DB
        res = card_to_update.to_dict()
        return res
    if form.errors:  # return 400 'bad request' & errors as dict
        res = {"errors": form.errors}
        return res, 400


@card_routes.route("/<int:id>/delete", methods=["DELETE"])
@login_required
def delete_card(id):
    """
    Delete one card (by card_id):
    DELETE /api/cards/:card_id/delete
    """
    card_to_delete = Card.query.get(id)  # get card
    db.session.delete(
        card_to_delete
    )  # delete card from SQLAlchemy session/staging area
    db.session.commit()  # persist deletion to DB
    card_to_delete = Card.query.get(id)  # try to get card again

    if card_to_delete == None:  # if deletion succeeded
        return {"message": "Successfully deleted card", "id": id}
    else:  # if deletion failed
        return {"error": "Card could not be deleted"}
