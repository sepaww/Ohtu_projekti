import requests


class AppLibrary:
    def __init__(self):
        self._base_url = "http://localhost:5173"

        self.reset_application()

    def reset_application(self):
        requests.get(f"{self._base_url}/test/reset")
