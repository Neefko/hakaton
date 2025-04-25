from flask import Flask, render_template
import socket

app = Flask(__name__)

def my_local_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.connect(("8.8.8.8", 80))  # Google DNS
        local_ip = sock.getsockname()[0]
        return local_ip
    
@app.route("/")
def index():
    return render_template("main.html")


if __name__ == "__main__":
    app.run(host=my_local_ip(), port=8000)