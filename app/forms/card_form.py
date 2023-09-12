from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, NumberRange

class CardForm(FlaskForm):
    column_id = IntegerField('column_id', validators=[DataRequired()])
    index = IntegerField('index')
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
