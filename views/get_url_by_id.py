from flask import Blueprint, request, jsonify, current_app
from mods.check_parameter import check_parameter
from mods.DB import ReadWriteDB

GET_URL_BY_ID = Blueprint("GET_URL_BY_ID", __name__, url_prefix="/api")

@GET_URL_BY_ID.route("/quizletprogress", methods = ["POST"])
def get_url_by_id():
    if request.method == "POST":

        logger = current_app.logger

        response = {"result": "NG", "status": "", "url": ""}
        response["status"], quiz_id = check_parameter(request.get_json(), ["id"])

        if response["status"] == "OK":
            try:
                db = ReadWriteDB()
                url = db.ReadByID(quiz_id)["url"]
                if url != "":
                    response["result"] = "OK"
                    response["url"] = url
                else:
                    response["status"] = "Failed to create Quizlet word list"
            except:
                logger.debug("Async process are not finished")
                response["status"] = "DB error"

        return jsonify(response)