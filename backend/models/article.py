from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass
from sqlalchemy.orm import Mapped, mapped_column
from app import db


class Entry(MappedAsDataclass, DeclarativeBase):
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    @classmethod
    def all(cls):
        return db.session.execute(db.select(cls)).scalars().all()

    @classmethod
    def delete_by_citekey(cls, citekey):
        article_to_delete = cls.query.get(citekey)
        if article_to_delete:
            article_to_delete.delete()
            

class Article(Entry):
    __tablename__ = "article"
    citekey: Mapped[str] = mapped_column(db.String, primary_key=True)
    author: Mapped[str] = mapped_column(db.String, nullable=False)
    title: Mapped[str] = mapped_column(db.String, nullable=False)
    year: Mapped[str] = mapped_column(db.String, nullable=False)
    journal: Mapped[str] = mapped_column(db.String, nullable=False)


def get_schema():
    schema = {}

    entrytypes = list(Entry.metadata.tables.keys())
    for entrytype in entrytypes:
        fields = Entry.metadata.tables[entrytype].columns.keys()
        schema[entrytype] = fields

    return schema
