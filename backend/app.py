from flask import jsonify, request, Flask
# import bibrepository

app = Flask(__name__)

ref = [
    { 'title': 'moi', 'author': "testi" }
]


@app.route('/api/refs')
def get_refs():
    return jsonify(ref)

@app.route('/api/refs', methods=['POST'])
def add_refs():
    ref.append(request.get_json())
    return '', 204