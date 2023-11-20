import sqlite3

class DB():
    def __init__(self, database):
        self.connection = sqlite3.connect(database)
        self.cursor=self.connection.cursor()
        self.cursor.execute('''
    CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY,
        author TEXT,
        title TEXT,
        journal TEXT,
        year INTEGER,
        volume TEXT,
        number TEXT,
        pages TEXT
    )
    ''')
        self.connection.commit()
        
