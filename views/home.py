from flask import Blueprint, request, jsonify, render_template

HOME = Blueprint("HOME", __name__, template_folder = "templates", static_folder="static")

@HOME.route("/", methods = ["GET"])
def test():
    return render_template("index.html")
    
