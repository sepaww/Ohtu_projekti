from repository.sql_connect import DB

class Command():
    def __init__(self, database):
        self.DB=DB(database)
        
    def add_article(self,values):
        self.DB.cursor.execute('''
            INSERT INTO articles (author, title, journal, year, volume, number, pages)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', values)
        self.DB.connection.commit()
    def get_articles(self):
        articles=self.DB.cursor.execute('SELECT * FROM articles').fetchall()
        return articles