from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query
import socket
import uvicorn
from usersDB import DataBase


app = FastAPI()

db = DataBase()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # разрешить всё
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем любые HTTP-методы (GET, POST и т.д.)
    allow_headers=["*"],  # Разрешаем любые заголовки
)
def my_local_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.connect(("8.8.8.8", 80))  # Google DNS
        local_ip = sock.getsockname()[0]
        return local_ip

@app.get("/getItems")
def readItems():
    return db.getData()

@app.get("/addUser")
def addUser(name = Query(..., description="Имя пользователя")):
    return db.addUser(str(name))

@app.get("/addMoney")
def addUser(bank = Query(..., description="Кол-во валюты")):
    return db.addMoney(str(bank).split('_'))

if __name__ == '__main__':
    uvicorn.run(app, host=my_local_ip(), port=5000)