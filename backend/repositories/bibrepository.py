from app import db
from model import *


class BibRepository:
    def save(self, new: Article) -> None:
        db.session.add(new)
        db.session.commit()

    def all(self) -> list[Article]:
        return db.session.execute(db.select(Article)).scalars()

    def _reset(self) -> None:
        db.drop_all()
        db.create_all()


bib_repository = BibRepository()
