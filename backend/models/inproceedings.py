from .entry import Entry
from app import db
from sqlalchemy.orm import Mapped, mapped_column

class Inproceedings(Entry):
    __tablename__ = "inproceedings"
    author: Mapped[str] = mapped_column(db.String, nullable=False)
    title: Mapped[str] = mapped_column(db.String, nullable=False)
    year: Mapped[str] = mapped_column(db.String, nullable=False)
    book_title: Mapped[str] = mapped_column(db.String, nullable=False)