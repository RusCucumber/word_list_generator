from application import worker
#from mods.quizlet_new_new import Quizlet
from mods.quizlet import Quizlet
#from mods.DB import ReadWriteDB
from application import conn
import traceback

@worker.task()
def quizlet_generate(username, password, words, quiz_id):
    max_trial = range(1)
    url = ""
    for i in max_trial:
        if url != "":
            break

        # しずき遅くまでありがとう！
        q = Quizlet(words)
        try:
            q.degree_downer()
            q.create_new(username, password)
            q.set_language()
            url = q.get_url()
            q.finish()
            print(url)
        except:
            q.finish()
            print("Trial: {} time(s)".format(i))
            print(traceback.format_exc())

    try:
        #db = ReadWriteDB()
        conn.Write(data = {"id": quiz_id, "url": url})
        #db.Close()
    except:
        print(traceback.format_exc())
        
    return url