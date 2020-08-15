import dataset
import os
from mods.read_config import read_config

class ReadWriteDB:
    def __init__(self):
        ini = read_config("config")
        read_ini = ini["DATABASE"]
        URI = read_ini.get("URI")
        TABLE = read_ini.get("TABLE")
        
        self.__db = dataset.connect(URI)
        self.table = self.__db[TABLE]

    def Write(self, data):
        self.table.insert(data)

    def ReadByID(self, quiz_id):
        return self.table.find_one(id = quiz_id)

    def DeleteByID(self, quiz_id):
        self.table.delete(id = quiz_id)

    def Close(self):
        self.__db.close()