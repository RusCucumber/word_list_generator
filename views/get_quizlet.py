from flask import Flask, Blueprint, request, jsonify
from mods.check_parameter import check_parameter

GET_QUIZLET = Blueprint("GET_QUIZLET", __name__, url_prefix="/api")

@GET_QUIZLET.route("/quizlet", methods = ["POST"])
def get_quizlet():
    if request.method == "POST":
        response = {"result": "NG", "status": "", "url": ""}

        json_keys = ["username", "password", "words"]
        response["status"], username, password, words = check_parameter(request.get_json(), json_keys)
        
        if response["status"] == "OK":
            try:
                # quizletモジュールからURLを取得する処理
                pass
                #念のため、username, passwordのメモリ開放をしておく
                del username
                del password
                response["result"] = "OK"
                response["status"] = "Quizlet scraping success"
                #ダミーURL
                response["url"] = "https://quizlet.com/"
            except:
                response["status"] = "Quizlet scraping failed"

        return jsonify(response)