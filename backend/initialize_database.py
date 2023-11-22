from database import db
from app import create_app

app = create_app()
app.app_context().push()


def initialize_database():
    db.drop_all()
    db.create_all()


if __name__ == "__main__":
    initialize_database()
