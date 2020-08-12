from flask import Blueprint, request, jsonify
from mods.check_parameter import check_parameter
from mods.nltk_download import nltk_download

NLTK_INIT = Blueprint("NLTK_INIT", __name__, url_prefix="/apis")

@NLTK_INIT.route("/init", methods = ["POST"])
def nltk_init():
    if request.method == "POST":
        response = {"result": "NG", "status": ""}
        
        response["status"], command = check_parameter(request.get_json(), ["command"])

        if response["status"] == "OK":
            if command == "download":
                response["result"], response["status"] = nltk_download()
            else:
                response["status"] = "invalid value"

        return response