from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length


class BoardForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    image_url = StringField("image_url", validators=[DataRequired()])
    title = StringField(
        "title",
        validators=[
            DataRequired(),
            Length(min=1, max=30, message="Title must be 1-30 characters"),
        ],
    )
