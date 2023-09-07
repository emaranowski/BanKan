from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class ColumnForm(FlaskForm):
    board_id = IntegerField('board_id', validators=[DataRequired()])
    color_id = IntegerField('color_id', validators=[DataRequired()])
    color_hex = StringField('color_hex', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
