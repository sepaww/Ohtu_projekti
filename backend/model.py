from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.exc import IntegrityError
from database import db


class Entry(db.Model):
    citekey: Mapped[str] = mapped_column(db.String, primary_key=True)
    type: Mapped[str]
    author: Mapped[str] = mapped_column(db.String)
    title: Mapped[str] = mapped_column(db.String)
    year: Mapped[str] = mapped_column(db.String)

    __mapper_args__ = {
        "polymorphic_on": "type",
        "polymorphic_identity": "entry",
    }

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except IntegrityError:
            raise ValueError(f"citekey {self.citekey} already exists.")

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def all(cls):
        return db.session.execute(db.select(cls)).scalars().all()


class Article(Entry):
    journal: Mapped[str] = mapped_column(db.String, nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "article",
    }


class Book(Entry):
    publisher: Mapped[str] = mapped_column(db.String, nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "book",
    }


class Inproceedings(Entry):
    booktitle: Mapped[str] = mapped_column(db.String, nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "inproceedings",
    }


def get_schema():
    schema = {}

    for cls in Entry.__subclasses__():
        entrytype = cls.__mapper_args__["polymorphic_identity"]
        fields = list(cls.__dataclass_fields__.keys())
        fields.remove("type")
        schema[entrytype] = fields

    return schema
