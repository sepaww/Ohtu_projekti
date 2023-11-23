from app import db
from models.bib import Article


class BibRepository:
    def save(self, new: Article) -> None:
        db.session.add(new)
        db.session.commit()

    def all(self) -> list[Article]:
        return db.session.execute(db.select(Article)).scalars().all()


bib_repository = BibRepository()
