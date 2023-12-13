import unittest
from flask import Flask, json
from app import bib_controller, db
from unittest.mock import patch
from pathlib import Path
import tempfile


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
        self.client = self.app.test_client()
        example_citekey = "example_citekey"

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_get(self):
        response = self.client.get("/api/refs")
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("refs", data)
        self.assertIn("form", data)
        self.assertIsInstance(data["refs"], list)
        self.assertIsInstance(data["form"], dict)

    def test_save_data_success(self):
        payload = {
            "citekey": "exampleauthor90",
            "type": "article",
            "author": "another author",
            "title": "another title",
            "year": "1990",
            "journal": "another journal",
        }
        json_payload = json.dumps(payload)

        response = self.client.post(
            "/api/refs", data=json_payload, content_type="application/json"
        )
        self.assertEqual(response.status_code, 201)
        json_data = json.loads(response.get_data(as_text=True))
        self.assertEqual(json_data["citekey"], "exampleauthor90")
        self.assertEqual(json_data["type"], "article")
        self.assertEqual(json_data["author"], "another author")
        self.assertEqual(json_data["title"], "another title")
        self.assertEqual(json_data["year"], "1990")
        self.assertEqual(json_data["journal"], "another journal")

    @patch("services.data_service.DataService.save_data")
    def test_save_data_fail(self, mock_save_data):
        mock_save_data.side_effect = Exception("Error")
        response = self.client.post("/api/refs", data=json.dumps({"key": "value"}), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        expected_message = "Error"
        self.assertEqual(response.json["message"], "Error")



    @patch("services.data_service.DataService.delete_ref")
    def test_delete_ref_success(self, mock_data_service):
        mock_data_service.delete_ref.return_value = None

        response = self.client.delete(
            "/api/refs/example_citekey", content_type="application/json"
        )
        self.assertEqual(response.status_code, 204)

    def test_delete_ref_fail(self):
        mock_delete_ref = "citekey example_citekey was not found"
        response = self.client.delete(
            "/api/refs/example_citekey", content_type="application/json"
        )
        self.assertEqual(response.status_code, 500)
        result = response.get_json()
        self.assertEqual(result["message"], mock_delete_ref)

    @patch("services.data_service.DataService.reset")
    def test_reset(self, mock_reset):
        mock_reset.return_value = True
        response = self.client.get("/test/reset")
        mock_reset.assert_called_once()
        expected_response = "Database was reset."
        self.assertEqual(response.data.decode("utf-8"), expected_response)
        self.assertEqual(response.status_code, 200)

    @patch("services.data_service.DataService.save_as_bib")
    def test_download_bib(self, mock_save):
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            mock_save.return_value = temp_file.name
            response = self.client.get("/api/refs/export")
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.headers["Content-Type"], "application/octet-stream")

            self.assertIn("Content-Disposition", response.headers)
            self.assertIn("attachment", response.headers["Content-Disposition"])
        Path(temp_file.name).unlink()

