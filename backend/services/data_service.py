from models.article import Article, db
import bibtexparser
from bibtexparser.bwriter import BibTexWriter
from bibtexparser.bibdatabase import BibDatabase


class DataService:
    def get_all(self):
        return Article.all()

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

    def save_as_bib(self):
        refs = self.get_all()
        bib_database = BibDatabase()
        for article in refs:
            entry = {
                'ENTRYTYPE': 'article',
                'ID': article.citekey,
                'author': article.author,
                'title': article.title,
                'year': article.year,
                'journal': article.journal,
            }
            bib_database.entries.append(entry)


        file_path = "backend/bibtex/output.bib"
       
        with open(file_path, 'w') as bibfile:
            writer = BibTexWriter()
            bibfile.write(writer.write(bib_database))

        return file_path
    