from flask import Blueprint, request, jsonify, render_template
from mods.NltkLemmatizer import NltkLemmatizer
from mods.check_parameter import check_parameter
from mods.translate import translate

GET_WORDS = Blueprint("GET_WORDS", __name__, url_prefix = "/api") 

@GET_WORDS.route("/lemmatisation", methods = ["POST"])
def get_words():
    response = {"result": "NG", "status": "", "word_list": []}
    json_keys = ["sentence", "index"]

    response["status"], sentence, index = check_parameter(request.get_json(), json_keys)

    if response["status"] == "OK":
        try:
            lem = NltkLemmatizer(sentence)
            lem.set_index(index)
            word_list = lem.Lemmatize(marked_word = True, caribration = True)
            response["status"] = "Lemmatize success"
        except:
            response["status"] = "Lemmatize failed"
        else:
            try:
                response["word_list"].extend(translate(word_list))
                response["status"] += "\nTranslate success"
                response["result"] = "OK"
            except:
                response["status"] += "\nTranslate failed"
        
        print(response["word_list"])
    
    return jsonify(response)