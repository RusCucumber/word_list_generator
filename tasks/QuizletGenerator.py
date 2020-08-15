from application import worker
from mods.quizlet_new import Quizlet
import traceback

@worker.task()
def quizlet_generate(username, password, words):
    max_trial = range(10)
    url = ""
    for i in max_trial:
        if url != "":
            break

        try:
            q = Quizlet(words)
            q.open_to_login(username, password)
            url = q.entire_action()
            print(url)
        except:
            print(traceback.format_exc())

    # DBに突っ込む
    return url