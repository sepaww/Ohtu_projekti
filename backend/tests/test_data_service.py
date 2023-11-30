import unittest
from unittest.mock import patch, Mock
from services.data_service import DataService, Article, db


class TestDataService(unittest.TestCase):
    def setUp(self):
        self.data_service = DataService()
        self.payload = {
            "type": "article",
            "citekey": "199",
            "year": "1888",
            "title": "example",
            "author": "Some author",
            "journal": "HS",
        }

    def test_data_service_integration(self):
        with patch("services.data_service.db.session.add") as mock_add, \
             patch("services.data_service.db.session.commit") as mock_commit:

            article = self.data_service.save_data(self.payload)
            mock_add.assert_called_once_with(article)
            mock_commit.assert_called_once()

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
        result = data_service.save_data(self.payload)
        mock_article.assert_called_once()
        self.assertIsInstance(result, Article)
        self.assertEqual(result.author, "Some author")
        self.assertEqual(result.title, "example")
    

    def test_data_service_delete(self):
        with patch("services.data_service.db.session.query") as mock_query:
            mock_article = mock_query.return_value.filter_by.return_value.first.return_value
            mock_query.return_value.filter_by.return_value.first.side_effect = [mock_article]

            result = self.data_service.delete_article(citekey="123")
            mock_query.assert_called_once_with(Article)
            mock_query.return_value.filter_by.assert_called_once_with(citekey="123")
            mock_query.return_value.filter_by.return_value.first.assert_called_once()
            if mock_article:
                self.assertTrue(result)

if __name__ == "__main__":
    unittest.main()
