from models.article import Article


class DataService:
    def get_all(self):
        return Article.all()

    # tähän voi lisätä myös eri viitetyyppien tallennuksen
    def save_data(self, payload):
        if payload.pop("type") == "article":
            new = Article(**payload)
            new.save()
            return new
