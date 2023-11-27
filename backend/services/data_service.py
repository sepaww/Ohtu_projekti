from models.article import Article
import random


class DataService():

    def get_all(self):
        return Article.all()
    
    # tähän voi lisätä myös eri viitetyyppien tallennuksen
    def save_data(self, payload):
        new = Article(
            citekey=str(random.randint(0, 10000)),
            author=payload["author"],
            title=payload["title"],
            year=str(random.randint(0, 1000)),
            journal=payload["journal"],
        )
        new.save()
        return new