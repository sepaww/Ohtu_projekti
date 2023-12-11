import unittest
from flask import Flask, json
from app import bib_controller, db
from unittest.mock import patch, Mock


class BibControllerTestCase(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config["TESTING"] = True
        self.app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///:memory:"
        self.app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
        with self.app.app_context():
            db.init_app(self.app)
            db.create_all()
        self.app.register_blueprint(bib_controller)
        self.data = {
            "Title": "example",
            "Author": "Some_author",
            "Journal": "HS ",
            "type": "Journal",
        }
        self.client = self.app.test_client()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

   # @patch("services.data_service.DataService.get_all")
   # def test_get(self, mock_get_all):
   #     mock_get_all.return_value = self.data
   #     response = self.client.get("/api/refs")
   #     self.assertEqual(response.status_code, 200)
#
   #     data = json.loads(response.data)
   #     self.assertIn("form", data)
   #     form_data = data["form"]
   #     expected_form_data = {
   #         "article": ["author", "title", "year", "journal", "citekey"]
   #     }
#
   #     self.assertEqual(form_data, expected_form_data)

    @patch("services.data_service.DataService.save_data")
    def test_save_data(self, mock_save_data):
        mock_save_data.return_value = self.data
        data_to_be_saved = self.data
        response = self.client.post("/api/refs", json=data_to_be_saved)
        self.assertEqual(response.status_code, 201)
        data = response.get_json()
        self.assertEqual(data, self.data)

  #  def test_delete_ref_success(self):
  #      mock_delete_ref = Mock()
  #      mock_delete_ref.return_value = True
  #      response = self.client.delete(
  #          "/api/refs/example_citekey", content_type="application/json"
  #      )
  #      self.assertEqual(response.status_code, 204)
  #      self.assertEqual(response.get_data(as_text=True), "")

   # def test_delete_ref_fail(self):
   #     with patch(
   #         "services.data_service.DataService.delete_ref"
   #     ) as mock_delete_ref:
   #         mock_delete_ref.return_value = False
#
   #         response = self.client.delete(
   #             "/api/refs/example_citekey", content_type="application/json"
   #         )
   #         self.assertEqual(response.status_code, 500)
   #         expected_message = "Failed to delete article with citekey."
   #         result = response.get_json()
   #         self.assertEqual(result["message"], expected_message)

    @patch("services.data_service.DataService.reset")
    def test_reset(self, mock_reset):
        mock_reset.return_value = True
        response = self.client.get("/test/reset")
        mock_reset.assert_called_once()
        expected_response = "Database was reset."
        self.assertEqual(response.data.decode("utf-8"), expected_response)
        self.assertEqual(response.status_code, 200)
