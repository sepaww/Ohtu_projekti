import unittest


from flask import Flask
from controllers.bib_controller import bib_controller


class BibControllerTestCase(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.app.register_blueprint(bib_controller)

        self.client = self.app.test_client()

    def test_get(self):
        response = self.client.get('/api/refs')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()