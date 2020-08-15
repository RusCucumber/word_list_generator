import dataset
import os

class ReadWriteDB:
    def __init__(self):
        DBMS = os.getenv("DBMS")
        USER = os.getenv("USER")
        PASS = os.getenv("PASS")
        HOST = os.getenv("HOST")
        DB = os.getenv("DB")
        TABLE = os.getenv("TABLE")

        #db = dataset.connect("{0}://{1}:{2}@{3}/{4}".format(DBMS, USER, PASS, HOST, DB))
        db = dataset.connect("{0}://{1}@{2}/{3}".format(DBMS, USER, HOST, DB))
        self.table = db[TABLE]

    def Write(self, data):
        self.table.insert(data)

    def ReadByID(self, quiz_id):
        return self.table.find_one(id = quiz_id)