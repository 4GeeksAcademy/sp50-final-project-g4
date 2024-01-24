"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import bcrypt


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json('email')
    password = request.json('password')
    if not email:
        return jsonify({'message': 'Falta introducir el Email.'}), 401
    if not password:
        return jsonify({'message': 'Introduzca la contraseña'}), 401
    user = Users.query.filter_by(Users.email == email).first()
    if users:
        if bcrypt.hashpw(password.encode('utf-8'), users.password.encode('utf-8')):
            response_body = data_serialize = {}
            if user.is_professor:
                user_professor = db.session.execute(db.select(Professors).where(Professors.id_user == user.serialize()["id"])).scalar()
                data_serialize = user_professor.serialize()
            else:
                user_parents = db.session.execute(db.select(Parents).where(Parents.id_user == user.serialize()["id"])).scalar()
                parents_students = db.session.execute(db.select(Students).where(Students.parents_id == user_parents.serialize()["id"])).scalars() 
                data_serialize = user_parents.serialize()
                data_serialize['childs'] = []
                for row in parents_students:
                    data_serialize['childs'].append(row.serialize())
            access_token = create_access_token(identity=[user.serialize(), data_serialize])
            response_body["message"] = "Login"
            response_body["results"] = {"user": user.serialize(), "profile": data_serialize}
            response_body["access_token"] = access_token
            return response_body, 200
        response_body["message"] = "Su contraseña no es correcta"
        return response_body, 403
    response_body["message"] = "Usted no es usuario"
    return response_body, 403            

@api.route('/logout', methods=["POST"])  
@jwt_required()
def handle_logout():
    user_id = get_jwt_identity()[0]  
    response_body = {'message': 'Logout successful'}
    return response_body, 200

    


@api.route('/users', methods=['POST', 'GET'])
@jwt_required
def handle_users():
    id = get_jwt_identity()
    response_body = results = {}
    if id:
        user = Users.query.get(id)
        user = user.serialize()
        if request.methods == 'GET':
            if user.is_professor:
                profile = Professors.query.filter_by(user_id = id)
                user.append(profile)
                return jsonify(users), 200
            else:
                profile = Parents.query.filter_by(user_id = id)
                user.append(profile)
                return jsonify(users), 200
        if request.methods == 'POST':  
            data = request.json
            new_user = Users(email = data['email'],
                            password = data['password'],
                            is_professor = data['is_professor'])
            db.session.add(new_user)
            db.session.commit()
            results['user'] = new_user.serialize()
            if new_user.is_professor:
                profile = Professors(user_id = new_user.id,
                                     name = data['name'],
                                     lastname = data['lastname'],
                                     address = data['address'],
                                     phone = data['phone'],
                                     email_professor = data['email_professor'],
                                     rol = data['rol'])
                results['professor']= profile.serialize()
                response_body['results'] = results
                response_body['message'] = '*' # modificar mensaje
                return response_body, 200
            else:
                profile = Parents(user_id = new_user.id,
                                  name = data['name'],
                                  lastname = data['lastname'],
                                  address = data['address'],
                                  phone = data['phone'],
                                  phone_2 = data['phone_2'],
                                  email_parent = data['email_parent'],
                                  email_parent_2 = data['email_parent_2'],
                                  student = data['student'],)
                results['parent']= profile.serialize()
                response_body['results'] = results 
                response_body['message'] = '*'  # modificar mensaje               
                return response_body, 200             
    else:
        return jsonify({'error': 'usuario no logueado'}), 403



#@api.route('/professors', methods=['GET'])
#def handle_professsors():
    
         