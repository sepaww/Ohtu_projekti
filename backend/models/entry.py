from sqlalchemy.orm import DeclarativeBase, MappedAsDataclass
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.exc import IntegrityError
from database import db


class Entry(MappedAsDataclass, DeclarativeBase):
    citekey: Mapped[str] = mapped_column(db.String, primary_key=True)

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
    
def get_schema():
    schema = {}

    entrytypes = list(Entry.metadata.tables.keys())
    for entrytype in entrytypes:
        fields = Entry.metadata.tables[entrytype].columns.keys()
        schema[entrytype] = fields

    return schema