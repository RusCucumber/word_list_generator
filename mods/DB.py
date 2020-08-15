import dataset
import os
from mods.read_config import read_config

class ReadWriteDB:
    def __init__(self):
        """ local版
        DBMS = os.getenv("DBMS")
        USER = os.getenv("USER")
        PASS = os.getenv("PASS")
        HOST = os.getenv("HOST")
        DB = os.getenv("DB")
        TABLE = os.getenv("TABLE")

        db = dataset.connect("{0}://{1}@{2}/{3}".format(DBMS, USER, HOST, DB))
        """

        ini = read_config("config")
        read_ini = ini["DATABASE"]
        URI = read_ini.get("URI")
        TABLE = read_ini.get("TABLE")
        
        db = dataset.connect(URI)
        
        self.table = db[TABLE]

    def Write(self, data):
        self.table.insert(data)

    def ReadByID(self, quiz_id):
        return self.table.find_one(id = quiz_id)

    def DeleteByID(self, quiz_id):
        self.table.delete(id = quiz_id)