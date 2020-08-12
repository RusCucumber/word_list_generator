from flask import Blueprint, request, jsonify, render_template
from mods.NltkLemmatizer import NltkLemmatizer
from mods.check_parameter import check_parameter

GET_WORDS = Blueprint("GET_WORDS", __name__, url_prefix = "/nltk") 

@GET_WORDS.route("/lemmatisation", methods = ["POST"])
def get_words():
    response = {"result": "NG", "status": "", "word_list": []}
    json_keys = ["sentence", "index"]
    response["status"], sentence, index = check_parameter(request.get_json(), json_keys)
    if response["status"] == "OK":
        try:
            lem = NltkLemmatizer(sentence)
            lem.set_index(index)
            response["word_list"].extend(lem.Lemmatize(marked_word = True))
            response["status"] = "Lemmatize success"
            response["result"] = "OK"
        except Exception as e:
            print(e)
            response["status"] = "Lemmatize failed"
    
    return jsonify(response)
