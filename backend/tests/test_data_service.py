import unittest
from unittest.mock import patch, Mock, MagicMock
from services.data_service import DataService, Article
from pathlib import Path
import tempfile


class TestDataService(unittest.TestCase):
    def setUp(self):
        self.data_service = DataService()
        self.article = {
            "type": "article",
            "citekey": "199",
            "year": "1888",
            "title": "example",
            "author": "Some author",
            "journal": "HS",
        }

        self.book = {
            "type": "book",
            "citekey": "200",
            "year": "2021",
            "title": "biochemistry",
            "author": "lehninger",
            "publisher": "freeman",
        }

        self.inproceedings = {
            "type": "inproceedings",
            "citekey": "201",
            "year": "2002",
            "title": "mooc",
            "author": "mluuk",
            "booktitle": "acm",
        }

    @patch("services.data_service.Entry")
    def test_get_all(self, mock_entry):
        mock_entry.all.return_value = [Article(**self.article)]
        result = self.data_service.get_all()

        self.assertEqual(result, [Article(**self.article)])

    @patch("services.data_service.Article")
    def test_save_article(self, MockArticle):
        result = self.data_service.save_data(self.article)

        MockArticle.assert_called_once()
        result.save.assert_called_once()

    @patch("services.data_service.Book")
    def test_save_book(self, MockBook):
        result = self.data_service.save_data(self.book)

        MockBook.assert_called_once()
        result.save.assert_called_once()

    @patch("services.data_service.Inproceedings")
    def test_save_inproceedings(self, MockInproceedings):
        result = self.data_service.save_data(self.inproceedings)

        MockInproceedings.assert_called_once()
        result.save.assert_called_once()

    @patch("services.data_service.Entry")
    def test_data_service_delete_nonexistent(self, mock_entry):
        mock_entry.get.return_value = None

        with self.assertRaises(LookupError):
            self.data_service.delete_ref("9999")

    @patch("services.data_service.Entry.get")
    @patch("services.data_service.Entry.delete")
    def test_data_service_delete(self, mock_entry_get, mock_entry_delete):
        mock_entry_get.get.return_value = Article(
            type="article",
            citekey="456",
            author="Author2",
            title="Title2",
            year="2021",
            journal="Journal2",
        )
        self.data_service.delete_ref("example_citekey")
        mock_entry_delete.assert_called_once()

    @patch("services.data_service.Entry")
    def test_reset_database(self, mock_entry):
        mock_book = Mock()
        mock_entry.all.return_value = [mock_book]
        self.data_service.reset()

        mock_book.delete.assert_called_once()

    def test_generate_bib(self):
        article1 = Article(
            type="article",
            citekey="123",
            author="Author1",
            title="Title1",
            year="2022",
            journal="Journal1",
        )
        article2 = Article(
            type="article",
            citekey="456",
            author="Author2",
            title="Title2",
            year="2021",
            journal="Journal2",
        )
        refs = [article1, article2]

        bib_database = self.data_service.generate_bibs(refs)

        expected_entries = [
            {
                "ENTRYTYPE": "article",
                "ID": "123",
                "author": "Author1",
                "title": "Title1",
                "year": "2022",
                "journal": "Journal1",
            },
            {
                "ENTRYTYPE": "article",
                "ID": "456",
                "author": "Author2",
                "title": "Title2",
                "year": "2021",
                "journal": "Journal2",
            },
        ]

        self.assertEqual(bib_database.entries, expected_entries)

    @patch(
        "services.data_service.Path.cwd",
        MagicMock(return_value=Path("/mocked/current/directory")),
    )
    @patch("services.data_service.DataService.get_all")
    @patch("services.data_service.DataService.generate_bibs")
    def test_save_as_bib(self, mock_get_all, mock_generate_bibs):
        mock_get_all = Article(
            type="article",
            citekey="456",
            author="Author2",
            title="Title2",
            year="2021",
            journal="Journal2",
        )
        mock_generate_bibs.return_value = "mocked_bib_database"

        with tempfile.TemporaryDirectory() as temp_dir:
            with patch(
                "services.data_service.Path.cwd", MagicMock(return_value=Path(temp_dir))
            ):
                result = self.data_service.save_as_bib()
                generated_path = Path(result)
                self.assertTrue(generated_path.is_file())
