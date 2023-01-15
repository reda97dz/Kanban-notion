from app import app
from app.models import db
from app.routes import *

app.app_context().push()
db.create_all()

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)