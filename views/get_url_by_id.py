from flask import Blueprint, request, jsonify, current_app
from mods.check_parameter import check_parameter
from application import conn
import traceback

GET_URL_BY_ID = Blueprint("GET_URL_BY_ID", __name__, url_prefix="/api")

@GET_URL_BY_ID.route("/quizletprogress", methods = ["POST"])
def get_url_by_id():
    if request.method == "POST":

        logger = current_app.logger

        response = {"result": "NG", "status": "", "url": ""}
        response["status"], quiz_id = check_parameter(request.get_json(), ["id"])

        if response["status"] == "OK":
            try:
                url = conn.ReadByID(quiz_id)["url"]
                if url != "":
                    response["result"] = "OK"
                    response["url"] = url
                else:
                    response["result"] = "OK"
                    response["status"] = "Failed to create Quizlet word list"
            except:
                logger.debug("Async process is not finished")
                response["status"] = "DB error"
                print(traceback.format_exc())

        return jsonify(response)