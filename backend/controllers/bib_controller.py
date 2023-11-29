from flask import jsonify, request, Blueprint
from services.data_service import DataService
from models.article import get_schema

bib_controller = Blueprint("bib", __name__)

data = [{"Title": "esimerkki", "Author": "Visa", "Journal": "HS ", "type": "Journal"}]
data_service = DataService()


@bib_controller.route("/api/refs")
def get_refs():
    return {"refs": data_service.get_all(), "form": get_schema()}, 200


@bib_controller.route("/api/refs", methods=["POST"])
def add_refs():
    payload = request.get_json()
    new = data_service.save_data(payload)

    return jsonify(new), 201


@bib_controller.route("/api/refs/<citekey>", methods=["DELETE"])
def delete_ref(citekey):
    ref_to_be_deleted = data_service.delete_article(citekey)
    if ref_to_be_deleted:
        return (
            jsonify(
                {"message": f"Article with citekey {citekey} deleted successfully"}
            ),
            204,
        )
    return jsonify({"message": f"Failed to delete article with citekey."}), 500
