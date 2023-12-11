from pathlib import Path
from models.article import Article, db
from models.book import Book
from models.inproceedings import Inproceedings
import bibtexparser
from bibtexparser.bwriter import BibTexWriter
from bibtexparser.bibdatabase import BibDatabase
from sqlalchemy import union_all


class DataService:
    def get_all(self):
        articles_query = Article.all()
        books_query = Book.all()
        inproceedings_query = Inproceedings.all()
        entries = articles_query + books_query + inproceedings_query
        return entries

    def save_data(self, payload):
        type = payload.pop("type")
        if type == "article":
            new = Article(**payload)
            new.save()

        if type == "book":
            new = Book(**payload)
            new.save()

        if type == "inproceedings":
            new = Inproceedings(**payload)
            new.save()

        return new

    def delete_ref(self, citekey):
        all_entries = self.get_all()
        try:
            for entry in all_entries:
                if entry.citekey == citekey:
                    if isinstance(entry, Article):
                        Article.delete()
                    if isinstance(entry, Book):
                        Book.delete()
                    if isinstance(entry, Inproceedings):
                        Inproceedings.delete()
                    return True

        except Exception as e:
            return False, e

    def reset(self):
        allrows = db.session.execute(db.select(Article)).scalars()
        for row in allrows:
            db.session.delete(row)
        db.session.commit()


    def generate_bibs(self, refs):
        bib_database = BibDatabase()
        for article in refs:
            entry = {
                "ENTRYTYPE": "article",
                "ID": article.citekey,
                "author": article.author,
                "title": article.title,
                "year": article.year,
                "journal": article.journal,
            }
            bib_database.entries.append(entry)
        return bib_database
    
    def save_as_bib(self):
        refs = self.get_all()
        bib_database = self.generate_bibs(refs)

        if "backend" == Path.cwd().name:
            file_path = Path.cwd() / "bibtex" / "output.bib"
        else:
            file_path = Path.cwd() / "backend" / "bibtex" / "output.bib"

        with open(file_path, "w") as bibfile:
            print(Path.cwd())
            writer = BibTexWriter()
            bibfile.write(writer.write(bib_database))

        return str(file_path)
