from dataclasses import dataclass
from sqlalchemy.orm import Mapped, mapped_column
from database import db


@dataclass
class Article(db.Model):
    citekey: Mapped[str] = mapped_column(db.String, primary_key=True)
    author: Mapped[str] = mapped_column(db.String, nullable=False)
    title: Mapped[str] = mapped_column(db.String, nullable=False)
    year: Mapped[str] = mapped_column(db.String, nullable=False)
    journal: Mapped[str] = mapped_column(db.String, nullable=False)
