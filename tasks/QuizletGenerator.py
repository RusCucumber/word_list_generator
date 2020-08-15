from application import worker
#from mods.quizlet_new_new import Quizlet
from mods.quizlet_3 import Quizlet
from mods.DB import ReadWriteDB
import traceback

@worker.task()
def quizlet_generate(username, password, words, quiz_id):
    max_trial = range(1)
    url = ""
    for i in max_trial:
        if url != "":
            break

        try:
            q = Quizlet(words)
            q.degree_downer()
            q.open_to_login(username, password)
            url = q.entire_action()
            print(url)
        except:
            print("Trial: {} time(s)".format(i))
            print(traceback.format_exc())

    try:
        db = ReadWriteDB()
        db.Write(data = {"id": quiz_id, "url": url})
    except:
        print(traceback.format_exc())
        
    return url