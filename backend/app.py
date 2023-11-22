from flask import jsonify, request, Flask
# import bibrepository

app = Flask(__name__)

@app.route("/", method=["POST"])
def create_reference():
    if request.method == "POST":
        return


@app.route("/", method=["GET"])
def get_references():
    if request.method == "POST":
    
        return jsonify()