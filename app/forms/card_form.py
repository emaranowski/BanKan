from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, Length, NumberRange

class CardForm(FlaskForm):
    column_id = IntegerField('column_id', validators=[DataRequired()])
    index = IntegerField('index')
    title = StringField('title', validators=[DataRequired(), Length(min=1, max=30, message='Title must be 1-30 characters')])
    description = StringField('description', validators=[Length(min=0, max=255, message='Description cannot be over 255 characters')])
