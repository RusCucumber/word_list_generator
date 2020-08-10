from flask import Blueprint, request, jsonify

TEST = Blueprint("TEST", __name__)

@TEST.route("/", methods = ["GET", "POST"])
def test():
    if request.method == "GET":
        return "This is a test."
    elif request.method == "POST":
        try:
            data = request.get_json()
            msg = data["msg"]
        except:
            msg = "NG"
        finally:
            response = {"msg": msg}
            return jsonify(response)
