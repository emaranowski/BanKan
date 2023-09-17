from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, URL, Length

class NotebookForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired(), URL(), Length(min=1, max=255)])
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=30)])
    note_order = StringField('note_order')
