from flask import Flask
from views.test import TEST

app = Flask(__name__)

app.register_blueprint(TEST)