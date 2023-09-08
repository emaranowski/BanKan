from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class BoardForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
