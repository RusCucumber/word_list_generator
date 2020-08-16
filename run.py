from application import app
import os

if __name__ == "__main__":
    port = os.getenv("PORT")
    app.run(host = "0.0.0.0", port = port, debug = True)