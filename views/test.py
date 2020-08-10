from flask import Blueprint, request, jsonify, render_template

TEST = Blueprint("TEST", __name__, template_folder = "templates")

@TEST.route("/test", methods = ["GET", "POST"])
def test():
    if request.method == "GET":
        return render_template("test.html")
    elif request.method == "POST":
        try:
            data = request.get_json()
            msg = data["msg"]
        except:
            msg = "NG"
        finally:
            response = {"msg": msg}
            return jsonify(response)
