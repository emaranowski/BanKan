from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, URL, Length

class NotebookForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired(), URL()])
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=50)])
    note_order = StringField('note_order')
