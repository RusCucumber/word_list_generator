from flask import Flask

app = Flask(__name__)

from worker import make_celery

worker = make_celery(app)

from views.test import TEST
from views.home import HOME
from views.nltk_init import NLTK_INIT
from views.get_words import GET_WORDS
from views.get_quizlet import GET_QUIZLET
from views.get_url_by_id import GET_URL_BY_ID

app.register_blueprint(HOME)
app.register_blueprint(TEST)

# NLTKで利用するファイルをダウンロードする
app.register_blueprint(NLTK_INIT)

# 文章のマーキングされた単語の基本形のリスト生成
app.register_blueprint(GET_WORDS)

app.register_blueprint(GET_QUIZLET)

app.register_blueprint(GET_URL_BY_ID)