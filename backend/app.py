from flask import jsonify, request, Flask
from bibrepository import BibRepository

app = Flask(__name__)

ref = [
    { 'title': 'moi', 'author': "testi" }
]


@app.route('/api/refs')
def get_refs():
    bib_repo = BibRepository()
    refs = bib_repo.all()
    if refs:
        return jsonify(refs)
    else:
        return jsonify({'error': 'No references found'}), 404


@app.route('/api/refs', methods=['POST'])
def add_refs():
    bib_repo = BibRepository()
    bib_repo.save(request.get_json())
    return '', 204