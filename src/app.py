"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from werkzeug.utils import secure_filename
from api.commands import setup_commands
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

#from models import Person

upload_folder = os.path.join('static', 'upload')
app = Flask(__name__)
app.config ['UPLOAD'] = upload_folder
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['JWT_SECRET_KEY'] = "jwt-password"
db.init_app(app)

migrate = Migrate(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app) 
CORS(app)

@app.route("/")
def home():
    return "base de datos backend"

@app.route("/users", methods=["POST"])
def create_user():
    user = User()
    user.name = request.json.get("name")
    user.lastname = request.json.get("lastname")
    user.username = request.json.get("username")
    user.email = request.json.get("email")
    password = request.json.get("password")
    password_hash = generate_password_hash(password)
    user.password = password_hash

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "usuario creado"}), 200

@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username")
    password = request.json.get("password")
    user = User.query.filter_by(username=username).first()
    if user is not None:
        is_valid = check_password_hash(user.password, password)
        if is_valid:
            access_token = create_access_token(identity=username)
            return jsonify({
                "token": access_token
            }), 200
    else:
        return jsonify({
            "msg":"usuario no existe"
        }), 400



@app.route("/users/list", methods=["GET"])
@jwt_required()
def get_users():
    username = get_jwt_identity()
    users = User.query.filter_by(username=username).first()
    
    return jsonify({"result": users.serialize()})



@app.route("/users/<int:id>", methods=["GET"])
def get_user(id):
    user = User.query.get(id)
    if user is not None:
        return jsonify({
            "name": user.name,
            "lastname": user.lastname,
            "username": user.username,
            "email": user.email
            })
    else:
        return jsonify({"msg": "usuario no existe"}), 404



@app.route("/users/<int:id>", methods=["PUT", "DELETE"])
def update_user(id):
    user = User.query.get(id)
    if user is not None:
        if request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()

            return jsonify("Deleted"), 204
        else:
            user.name = request.json.get("name")
            user.lastname = request.json.get("lastname")
            user.username = request.json.get("username")
            user.email = request.json.get("email")
            user.password = request.json.get("password")
            
            db.session.commit()
            
            return jsonify("usuario actualizado"), 200
    
    return jsonify("No Found"), 418

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
