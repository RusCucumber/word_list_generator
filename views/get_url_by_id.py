from flask import Blueprint, request, jsonify, current_app
from mods.check_parameter import check_parameter

GET_URL_BY_ID = Blueprint("GET_URL_BY_ID", __name__, url_prefix="/api")

@GET_URL_BY_ID.route("/quizletprogress", methods = ["POST"])
def get_url_by_id():
    if request.method == "POST":

        logger = current_app.logger

        response = {"result": "NG", "status": "", "url": ""}
        response["status"], quiz_id = check_parameter(request.get_json(), ["id"])

        if response["status"] == "OK":
            try:
                # デバッグように、OK、NGをランダムに返す
                import random
                if random.randint(0, 1) == 0:
                # URLの取得処理
                    response["result"] = "OK"
                response["url"] = "https://quizlet.com/"
            except:
                logger.debug("Async process are not finished")

        return jsonify(response)