from flask import jsonify, json, request, Blueprint
from repositories.bibrepository import bib_repository
from models.bib import Article

bib_controller = Blueprint("bib", __name__)

data =[{
    "Title": "esimerkki",
    "Author": "Visa",
    "Journal": "HS ",
    "type": "Journal"
}]

@bib_controller.route("/api/refs")
def get_refs():
    #refs = bib_repository.all()
    return jsonify(data)
    #if refs:
    #    return jsonify(refs)
    #else:
    #    return jsonify({"error": "No references found"}), 404


@bib_controller.route("/api/refs", methods=["POST"])
def add_refs():
   # ref = json.loads(request.get_json())
   # bib_repository.save(Article(**ref))
   data.append(request.get_json())
   return "", 204
