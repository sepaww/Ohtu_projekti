from dataclasses import dataclass
from sqlalchemy.orm import Mapped, mapped_column
from app import db


@dataclass
class Article(db.Model):
    citekey: Mapped[str] = mapped_column(db.String, primary_key=True)
    author: Mapped[str] = mapped_column(db.String, nullable=False)
    title: Mapped[str] = mapped_column(db.String, nullable=False)
    year: Mapped[str] = mapped_column(db.String, nullable=False)
    journal: Mapped[str] = mapped_column(db.String, nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def all(cls):
        return db.session.execute(db.select(Article)).scalars().all()
