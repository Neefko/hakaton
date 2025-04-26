from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import socket
from usersDB import DataBase
from datetime import datetime

app = FastAPI()
db = DataBase()

common_chat_messages = []
anon_chat_messages = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def send_common_message(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    message = data.get("message")

    if not user_id or not message:
        raise HTTPException(status_code=400, detail="user_id и message обязательны")

    user_info = db.cursor.execute('SELECT name FROM users WHERE id = ?', (user_id,)).fetchone()
    if not user_info:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    user_name = user_info[0]
    timestamp = datetime.now().strftime("%H:%M")  # время отправки (часы:минуты)

    common_chat_messages.append({
        "user_id": user_id,
        "name": user_name,
        "message": message,
        "timestamp": timestamp
    })

    return {"messages": common_chat_messages}

@app.get("/chat")
def get_common_messages():
    return {"messages": common_chat_messages}

@app.post("/anon_chat")
async def send_anon_message(request: Request):
    data = await request.json()
    message = data.get("message")

    if not message:
        raise HTTPException(status_code=400, detail="message обязателен")

    timestamp = datetime.now().strftime("%H:%M")
    anon_chat_messages.append({
        "message": message,
        "timestamp": timestamp
    })

    return {"status": "ok"}

@app.get("/anon_chat")
def get_anon_messages():
    return {"messages": anon_chat_messages}

@app.post("/login")
async def login_user(request: Request):
    data = await request.json()
    name = data.get("name")
    password = data.get("password")

    if not name or not password:
        raise HTTPException(status_code=400, detail="Имя и пароль обязательны")

    return db.checkLogin(name, password)

@app.post("/register")
async def register_user(request: Request):
    data = await request.json()
    name = data.get("name")
    password = data.get("password")

    if not name or not password:
        raise HTTPException(status_code=400, detail="Имя и пароль обязательны")

    return db.addUser(name, password)

def my_local_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]

if __name__ == "__main__":
    uvicorn.run(app, host=my_local_ip(), port=5000)