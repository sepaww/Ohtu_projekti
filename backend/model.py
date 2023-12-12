from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.exc import IntegrityError
from sqlalchemy import inspect
from database import db


class Entry(db.Model):
    citekey: Mapped[str] = mapped_column(primary_key=True)
    type: Mapped[str]
    author: Mapped[str]
    title: Mapped[str]
    year: Mapped[str]

    __mapper_args__ = {
        "polymorphic_on": "type",
        "polymorphic_identity": "entry",
    }

    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
        except IntegrityError as exc:
            db.session.rollback()
            raise ValueError(f"citekey {self.citekey} already exists.") from exc

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get(cls, citekey: str):
        return db.session.get(cls, citekey)

    @classmethod
    def all(cls):
        return db.session.scalars(db.select(cls)).all()


class Article(Entry):
    journal: Mapped[str] = mapped_column(nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "article",
    }


class Book(Entry):
    publisher: Mapped[str] = mapped_column(nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "book",
    }


class Inproceedings(Entry):
    booktitle: Mapped[str] = mapped_column(nullable=True)

    __mapper_args__ = {
        "polymorphic_identity": "inproceedings",
    }


def get_schema():
    schema = {}

    for cls in Entry.__subclasses__():
        entrytype = inspect(cls).polymorphic_identity
        fields = inspect(cls).columns.keys()
        fields.remove("type")
        schema[entrytype] = fields

    return schema
