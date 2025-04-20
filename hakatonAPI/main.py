from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import socket
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # разрешить всё
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем любые HTTP-методы (GET, POST и т.д.)
    allow_headers=["*"],  # Разрешаем любые заголовки
)

DB_PATH = "db"

def my_local_ip():
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
        sock.connect(("8.8.8.8", 80))  # Google DNS
        local_ip = sock.getsockname()[0]
        return local_ip

def get_data():
    conn = sqlite3.connect(DB_PATH)           # Подключаемся к базе данных
    cursor = conn.cursor()                    # Создаём курсор для выполнения SQL-запросов
    cursor.execute("SELECT id, name FROM users")  # Выполняем SQL-запрос (предполагаем, что есть таблица `items`)
    rows = cursor.fetchall()                  # Получаем все строки результата
    conn.close()                              # Закрываем соединение
    # Преобразуем строки в список словарей
    return [{"id": row[0], "name": row[1]} for row in rows]

@app.get("/items")
def read_items():
    return get_data()  # Просто возвращаем результат функции get_data()

if __name__ == '__main__':
    uvicorn.run(app, host=my_local_ip(), port=5000)