import unittest
from unittest.mock import patch
from services.data_service import DataService, Article


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
    



if __name__ == "__main__":
    unittest.main()
