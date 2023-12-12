from flask import jsonify, request, Blueprint, send_file
from services.data_service import DataService
from model import get_schema

bib_controller = Blueprint("bib", __name__)

data = [{"Title": "esimerkki", "Author": "Visa", "Journal": "HS ", "type": "Journal"}]
data_service = DataService()


@bib_controller.route("/api/refs")
def get_refs():
    return {"refs": data_service.get_all(), "form": get_schema()}, 200


@bib_controller.route("/api/refs", methods=["POST"])
def add_refs():
    payload = request.get_json()

    try:
        new = data_service.save_data(payload)
        return jsonify(new), 201
    except Exception as e:
        return {"message": str(e)}, 400


@bib_controller.route("/api/refs/<citekey>", methods=["DELETE"])
def delete_ref(citekey):
    try:
        data_service.delete_ref(citekey)
        return {"message": f"Entry with citekey {citekey} deleted successfully"}, 204
    except Exception as e:
        return {"message": str(e)}, 500


@bib_controller.route("/test/reset", methods=["GET"])
def test_reset():
    data_service.reset()
    return "Database was reset."


@bib_controller.route("/api/refs/export", methods=["GET"])
def download_bib():
    file_path = data_service.save_as_bib()
    return send_file(file_path, as_attachment=True)
