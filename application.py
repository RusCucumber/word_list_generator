from flask import Flask
from views.test import TEST
from views.home import HOME
app = Flask(__name__)

app.register_blueprint(HOME)
app.register_blueprint(TEST)