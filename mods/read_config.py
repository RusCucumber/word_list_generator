import sys
import configparser
import errno

def read_config(config_file):
    ini = configparser.ConfigParser()
    ini_path = "config/config.ini"

    if not os.path.exists(ini_path):
        raise FileNotFoundError(errno.ENOENT, os.stderror(errno.ENOENT), ini_path)
    
    ini.read(ini_path, encoding = "utf-8")
    return ini

if __name__ == "__main__":
    pass