from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class PresetImageForm(FlaskForm):
    hex = StringField('hex', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
