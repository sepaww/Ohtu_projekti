from pathlib import Path
from dataclasses import asdict
from model import Entry, Article, Book, Inproceedings
from bibtexparser.bwriter import BibTexWriter
from bibtexparser.bibdatabase import BibDatabase


class DataService:
    def get_all(self):
        return Entry.all()

    def save_data(self, payload):
        match (payload["type"]):
            case "article":
                new = Article(**payload)
            case "book":
                new = Book(**payload)
            case "inproceedings":
                new = Inproceedings(**payload)

        new.save()

        return new

    def delete_ref(self, citekey):
        trash = Entry.get(citekey)
        if trash is None:
            raise LookupError(f"citekey {citekey} was not found")

        trash.delete()

    def reset(self):
        for entry in Entry.all():
            entry.delete()

    def generate_bibs(self, refs):
        bib_database = BibDatabase()
        for ref in refs:
            entry = asdict(ref)
            entry["ENTRYTYPE"] = entry.pop("type")
            entry["ID"] = entry.pop("citekey")

            bib_database.entries.append(entry)

        return bib_database

    def save_as_bib(self):
        refs = self.get_all()
        bib_database = self.generate_bibs(refs)

        if Path.cwd().name == "backend":
            file_path = Path.cwd() / "bibtex" / "output.bib"
        else:
            file_path = Path.cwd() / "backend" / "bibtex" / "output.bib"
        file_path.parent.mkdir(parents=True, exist_ok=True)
        with open(file_path, "w") as bibfile:
            print(Path.cwd())
            writer = BibTexWriter()
            bibfile.write(writer.write(bib_database))

        return str(file_path)
