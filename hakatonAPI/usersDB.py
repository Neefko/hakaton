import sqlite3

class DataBase:
    def __init__(self) -> None:
        self.conn =sqlite3.connect('db', check_same_thread=False)
        self.cursor =self.conn.cursor()

    def getData(self):
        self.cursor.execute("SELECT id, name FROM users")
        rows = self.cursor.fetchall()
        return [{"id": row[0], "name": row[1]} for row in rows]
    
    def addUser(self, name):
        self.cursor.execute(f'INSERT INTO users (name) VALUES (?)', (name,))
        self.conn.commit()
        return True
    
    def addMoney(self, moneyName):
        money = moneyName[0]  # сумма для добавления
        user_id = moneyName[1]  # id пользователя

        # Обновляем значение денег, прибавляя новое значение
        self.cursor.execute(
        'UPDATE users SET bank = bank + ? WHERE id = ?',
        (int(money), user_id)
        )
        self.conn.commit()
        return True