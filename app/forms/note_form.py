from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length

class NoteForm(FlaskForm):
    notebook_id = IntegerField('notebook_id', validators=[DataRequired()])
    color_name = StringField('color_name')
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=30)])
    text = StringField('text', validators=[DataRequired(), Length(min=0, max=1500)])
