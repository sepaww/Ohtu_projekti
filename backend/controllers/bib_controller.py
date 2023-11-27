from flask import jsonify, request, Blueprint
from services.data_service import DataService

bib_controller = Blueprint("bib", __name__)

data = [{"Title": "esimerkki", "Author": "Visa", "Journal": "HS ", "type": "Journal"}]
data_service = DataService()

@bib_controller.route("/api/refs")
def get_refs():
    return data_service.get_all(), 200


@bib_controller.route("/api/refs", methods=["POST"])
def add_refs():
    payload = request.get_json()
    new = data_service.save_data(payload)

    return jsonify(new), 201
