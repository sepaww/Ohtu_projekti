import os  # flask will load .env automatically
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from database import db
from controllers.bib_controller import bib_controller


def create_app():
    app = Flask(
        __name__,
        static_url_path="/",
        static_folder="../frontend/dist",
    )

    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
    db.init_app(app)
    import models  # needed for database schema initialization

    migrate = Migrate(app, db)

    app.register_blueprint(bib_controller)

    @app.route('/')
    def index():
        return app.send_static_file('index.html')

    return app
