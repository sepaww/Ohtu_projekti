from .entry import Entry
from app import db
from sqlalchemy.orm import Mapped, mapped_column

class Book(Entry):
    __tablename__ = "book"
    author: Mapped[str] = mapped_column(db.String, nullable=False)
    title: Mapped[str] = mapped_column(db.String, nullable=False)
    year: Mapped[str] = mapped_column(db.String, nullable=False)
    publisher: Mapped[str] = mapped_column(db.String, nullable=False)