from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length


class ColumnForm(FlaskForm):
    board_id = IntegerField("board_id", validators=[DataRequired()])
    card_order = StringField("card_order")
    # color_hex = StringField('color_hex', validators=[DataRequired()])
    color_name = StringField("color_name", validators=[DataRequired()])
    title = StringField(
        "title",
        validators=[
            DataRequired(),
            Length(min=1, max=30, message="Title must be 1-30 characters"),
        ],
    )
