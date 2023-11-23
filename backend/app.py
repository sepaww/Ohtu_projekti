from flask import Flask
from database import db
from flask_cors import CORS
from controllers.bib_controller import bib_controller


def create_app():
    app = Flask(__name__)

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = "postgresql://postgres:postgres@localhost/postgres"
    db.init_app(app)

    app.register_blueprint(bib_controller)

    CORS(app)

    return app
