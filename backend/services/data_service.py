from models.article import Article
from database import db


class DataService:
    def get_all(self):
        return Article.all()

    # tähän voi lisätä myös eri viitetyyppien tallennuksen
    def save_data(self, payload):
        if payload.pop("type") == "article":
            new = Article(**payload)
            new.save()
            return new

    def delete_article(self, citekey):
        try:
            article = db.session.query(Article).filter_by(citekey=citekey).first()
            if article:
                article.delete()
                return True

        except Exception as e:
            return False, e

    def reset(self):
        allrows = db.session.execute(db.select(Article)).scalars()
        for row in allrows:
            db.session.delete(row)
        db.session.commit()
