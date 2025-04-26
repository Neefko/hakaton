from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from usersDB import DataBase
import uvicorn
import socket

app = FastAPI()
db = DataBase()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Можно указать конкретный origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
async def register(request: Request):
    data = await request.json()
    name = data.get("name")
    password = data.get("password")
    
    if not name or not password:
        raise HTTPException(status_code=400, detail="Имя и пароль обязательны")

    return db.addUser(name, password)

@app.post("/login")
async def login(request: Request):
    data = await request.json()
    name = data.get("name")
    password = data.get("password")
    
    if not name or not password:
        raise HTTPException(status_code=400, detail="Имя и пароль обязательны")
    
    return db.checkLogin(name, password)

@app.get("/getUsers")
def get_users():
    return db.getData()

@app.post("/addMoney")
async def add_money(request: Request):
    data = await request.json()
    user_id = data.get("user_id")
    amount = data.get("amount")

    if user_id is None or amount is None:
        raise HTTPException(status_code=400, detail="user_id и amount обязательны")

    return db.addMoney(user_id, amount)

def my_local_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]

if __name__ == '__main__':
    uvicorn.run(app, host=my_local_ip(), port=5000)