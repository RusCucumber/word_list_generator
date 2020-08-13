from flask import Flask
from views.test import TEST
from views.home import HOME
from views.nltk_init import NLTK_INIT
from views.get_words import GET_WORDS
from views.get_quizlet import GET_QUIZLET

app = Flask(__name__)

app.register_blueprint(HOME)
app.register_blueprint(TEST)

# NLTKで利用するファイルをダウンロードする
app.register_blueprint(NLTK_INIT)

# 文章のマーキングされた単語の基本形のリスト生成
app.register_blueprint(GET_WORDS)

app.register_blueprint(GET_QUIZLET)