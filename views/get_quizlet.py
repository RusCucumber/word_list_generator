from flask import Flask, Blueprint, request, jsonify
from mods.check_parameter import check_parameter
from mods.id_generator import id_generator

from my_tasks.QuizletGenerator import quizlet_generate

GET_QUIZLET = Blueprint("GET_QUIZLET", __name__, url_prefix="/api")

@GET_QUIZLET.route("/quizlet", methods = ["POST"])
def get_quizlet():
    if request.method == "POST":
        response = {"result": "NG", "status": "", "id": ""}

        json_keys = ["username", "password", "words"]
        response["status"], username, password, words = check_parameter(request.get_json(), json_keys)
        
        # debug処理
        if username == "test" and password == "test":
            username = "usagi_inaba"
            password = "artificialINTELLIGENCE"

        if response["status"] == "OK":
            try:
                quiz_id = id_generator()
                quizlet_generate.delay(username, password, words, quiz_id)
                response["result"] = "OK"
                response["status"] = "Async start"
                response["id"] = quiz_id
            except:
                response["status"] = "Async failed"

        return jsonify(response)