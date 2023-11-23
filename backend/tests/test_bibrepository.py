import unittest
from repositories.bibrepository import bib_repository
from models.bib import Article


class TestBibRepository(unittest.TestCase):
    def test_new(self):
        article = Article(
            citekey="ronneberger2015unet",
            title="U-Net...",
            author="Olaf Ronneberger and Philipp Fischer and Thomas Brox",
            year="2015",
            journal="arXiv",
        )

        bib_repository.save(article)
        entries = bib_repository.all()

        self.assertEqual(len(entries), 1)
        self.assertEqual(entries[0].title, "U-Net...")
