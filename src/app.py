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
from api.commands import setup_commands
from flask_bcrypt import Bcrypt, generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
app.config["JWT_SECRET_KEY"] = "clave-secreta"
jwt = JWTManager(app)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)
bcrypt = Bcrypt(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


#registrando usuarios
@app.route("/users", methods=["POST"])
def create_token():
    name = request.json.get('name')
    lastname = request.json.get('lastname')
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    password_hash = new_password_hash(password)
    password = password_hash

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify("usuario ya existe")

    user = User(
                    email = email, 
                    name = name,
                    lastname = lastname,
                    password = password
                )    

    db.session.add(user)
    db.session.commit()

    return "usuario registrado"


#login usuario
@app.route("/login", methods=["POST"])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    user = User.query.filter_by(email=email).first()
    if user is not None:
        is_valid = check_password_hash(user.password, password)
        if is_valid:
            access_token = new_access_token(identify=email)
            return jsonify({
                "token": access_token,
                "email": user.email,
                "user_id": user.id,
            }), 200
        else:
                return jsonify({
                "msg": "usuario o contraseña no existen o no son válidos"
                }), 400

#leer usuario
@app.route("/users/list", methods=['GET'])
def get_users():
    users = User.query.all()
    result = []
    for user in users:
        result.append(user.serialize())
    return jsonify(result), 200

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is not None:
        return jsonify(user.serialize())
    else:
        return jsonify("not found"), 404


#update/delete Users
@app.route('/users/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required
def update_user(id):
    user = User.query.get(id)
    if user is not None:
        if request.method == "DELETE":
            db.session.delete(user)
            db.session.commit()

            return jsonify("usuario eliminado "), 204
        else:
            user.name = request.json.get('name')
            user.lastname = request.json.get('lastname')
            user.username = request.json.get('username')
            user.email = request.json.get('email', user.email)
            user.password = request.json.get('password', user.password)
            user.rol_id = request.json.get('rol_id', user.rol_id)
            db.session.commit()

            return jsonify("usuario actualizado"), 200
        
    return jsonify("not found"), 404    





# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
