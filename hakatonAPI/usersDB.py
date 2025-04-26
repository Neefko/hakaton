import sqlite3
import hashlib
from fastapi.responses import JSONResponse

class DataBase:
    def __init__(self) -> None:
        self.conn = sqlite3.connect('db', check_same_thread=False)
        self.cursor = self.conn.cursor()

    def hash_password(self, password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

    def addUser(self, name, password):
        # Проверяем, существует ли пользователь с таким именем
        if self.checkUserExists(name):
            return JSONResponse(status_code=400, content={"message": "Пользователь с таким именем уже существует!"})
        
        hashed = self.hash_password(password)
        self.cursor.execute('INSERT INTO users (name, password) VALUES (?, ?)', (name, hashed))
        self.conn.commit()
        return {"status": "ok", "message": "Пользователь зарегистрирован!"}

    def checkLogin(self, name, password):
        hashed = self.hash_password(password)
        self.cursor.execute('SELECT * FROM users WHERE name = ? AND password = ?', (name, hashed))
        result = self.cursor.fetchone()
        if result:
            return {"status": "ok", "user_id": result[0], "name": result[1]}
        else:
            return JSONResponse(status_code=400, content={"message": "Неверное имя или пароль!"})

    def checkUserExists(self, name):
        self.cursor.execute('SELECT * FROM users WHERE name = ?', (name,))
        result = self.cursor.fetchone()
        return result is not None

    def getData(self):
        self.cursor.execute("SELECT id, name, bank FROM users")
        rows = self.cursor.fetchall()
        return [{"id": row[0], "name": row[1], "bank": row[2]} for row in rows]

    def addMoney(self, user_id: int, amount: int):
        self.cursor.execute('UPDATE users SET bank = bank + ? WHERE id = ?', (amount, user_id))
        self.conn.commit()
        return {"status": "ok", "message": "Деньги добавлены!"}