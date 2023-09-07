from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, URL

class PresetImageForm(FlaskForm):
    url = StringField('url', validators=[DataRequired(), URL()])
