import random
from flask import jsonify, request, Blueprint
from models.article import Article

bib_controller = Blueprint("bib", __name__)

data = [{"Title": "esimerkki", "Author": "Visa", "Journal": "HS ", "type": "Journal"}]


@bib_controller.route("/api/refs")
def get_refs():
    return Article.all(), 200


@bib_controller.route("/api/refs", methods=["POST"])
def add_refs():
    payload = request.get_json()
    new = Article(
        citekey=str(random.randint(0, 10000)),
        author=payload["author"],
        title=payload["title"],
        year=str(random.randint(0, 1000)),
        journal=payload["journal"],
    )
    new.save()

    return jsonify(new), 201
