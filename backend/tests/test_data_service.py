import unittest
from unittest.mock import patch, Mock
from services.data_service import DataService, Article
from controllers.bib_controller import delete_ref


class TestDataService(unittest.TestCase):
    @patch("services.data_service.Article")
    def test_get_all(self, mock_article):
        mock_article.all.return_value = ["article1", "article2", "article3"]

        data_service = DataService()
        result = data_service.get_all()

        self.assertEqual(result, ["article1", "article2", "article3"])
        mock_article.all.assert_called_once()

    @patch("services.data_service.Article.save")
    def test_save(self, mock_article):
        data_service = DataService()
        payload = {
            "type": "article",
            "citekey": "199",
            "year": "1888",
            "title": "example",
            "author": "Some author",
            "journal": "HS",
        }
        result = data_service.save_data(payload)
        mock_article.assert_called_once()
        self.assertIsInstance(result, Article)
        self.assertEqual(result.author, "Some author")
        self.assertEqual(result.title, "example")

    @patch("services.data_service.Article.delete_by_citekey")
    def test_delete_article_success(self, mock_delete_by_citekey):
        data_service = DataService()
        result = data_service.delete_article(citekey="example_citekey")
        mock_delete_by_citekey.assert_called_once_with("example_citekey")
        self.assertTrue(result)

    @patch(
        "services.data_service.Article.delete_by_citekey",
        side_effect=Exception("Mocked error"),
    )
    def test_delete_article_failure(self, mock_delete_by_citekey):
        data_service = DataService()
        result = data_service.delete_article(citekey="example_citekey")
        mock_delete_by_citekey.assert_called_once_with("example_citekey")
        self.assertFalse(result)


if __name__ == "__main__":
    unittest.main()
