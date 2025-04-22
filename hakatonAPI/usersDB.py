import sqlite3

class DataBase:
    def __init__(self) -> None:
        self.conn =sqlite3.connect('db', check_same_thread=False)
        self.cursor =self.conn.cursor()

    def getData(self):
        self.cursor.execute("SELECT id, name FROM users")
        rows = self.cursor.fetchall()
        self.conn.close()
        # Преобразуем строки в список словарей
        return [{"id": row[0], "name": row[1]} for row in rows]
    
    def sendData(self, name):
        self.cursor.execute(f'INSERT INTO users (name) VALUES (?)', (name))
        self.conn.commit()
        return True
    