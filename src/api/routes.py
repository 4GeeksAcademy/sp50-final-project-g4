"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Notifications, GlobalNotifications, Professors, Parents, Students, Groups 
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
                                  email_parent = data['email_parent'],
                                  student = data['student'],)
                results['parent']= profile.serialize()
                response_body['results'] = results 
                response_body['message'] = '*'  # modificar mensaje               
                return response_body, 200             
    else:
        return jsonify({'error': 'usuario no logueado'}), 403


@api.route('/notifications', methods=['GET'])
@jwt_required()
def handle_notifications():
    id = get_jwt_identity()
    notifications = Notifications.query.filter_by(student_id = id)
    notifications = [notification.serialize() for notification in notifications]
    return jsonify(notifications), 200
    

@api.route('/globalnotifications', methods=['GET'])
@jwt_required()
def handle_globalnotifications():
    id = get_jwt_identity()
    global_notifications = GlobalNotifications.query.filter_by(student_id = id)
    global_notifications = [global_notification.serialize() for global_notification in global_notifications]
    return jsonify(global_notifications), 200


@api.route('/professors', methods=['GET'])
@jwt_required
def handle_professor():
    id = get_jwt_identity()
    user = Professors.query.get(id)
    if user.rol == 'admin':
        professor = Professors.query.all()
        professor_data = [professor.serialize() for professor in professors]
        return jsonify ({'professors': professor_data}), 200


@api.route('/professors/<int:professor_id>', methods=['GET'])
@jwt_required
def professor_details(professor_id):
    id = get_jwt_identity()
    user = Professors.query.get(id)
    if user.rol == 'admin':
        professor = Professors.query.filter_by(professor_id = professor_id) 
        return jsonify(professor.serialize()), 200


@api.route('/professors', methods=['POST'])
@jwt_required
def create_professor():
    # Obtener los datos de la solicitud JSON
    data = request.json
    id = get_jwt_identity()
    professor = Professors.query.get(id)
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"

    # Crear un nuevo profesor
    new_professor = Professors(
                               name=data['name'],
                               lastname=data['lastname'],
                               address=data['address'],
                               phone=data['phone'],
                               email_professor=data['email_professor'],
                               rol=data['rol'],
                               user_id=data['user_id']
                               )

    # Agregar el nuevo profesor a la sesión y realizar la operación de commit
    db.session.add(new_professor)
    db.session.commit()

    # Devolver una respuesta JSON indicando que el profesor se creó correctamente
    return jsonify({"message": "Profesor creado correctamente", "professor": new_professor.serialize()}), 201


@api.route('/professors/<int:professor_id>', methods=['PUT'])
@jwt_required
def update_professor(professor_id):
    # Obtener los datos de la solicitud JSON
    data = request.json
    id = get_jwt_identity()
    existing_professor = Professors.query.get(professor_id)
    if not existing_professor:
        return jsonify({"error": "Profesor no encontrado"}), 404  # 404 significa "No encontrado"
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if existing_professor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"

    # Actualizar los campos del profesor con los nuevos datos
    existing_professor.name = data['name']
    existing_professor.lastname = data['lastname']
    existing_professor.address = data['address']
    existing_professor.phone = data['phone']
    existing_professor.email_professor = data['email_professor']
    existing_professor.rol = data['rol']
    # Realizar la operación de commit para aplicar los cambios en la base de datos
    db.session.commit()
    # Devolver una respuesta JSON indicando que el profesor se actualizó correctamente
    return jsonify({"message": "Profesor actualizado correctamente", "professor": existing_professor.serialize()})


@api.route('/professors/<int:professor_id>', methods=['DELETE'])
@jwt_required
def delete_professor(professor_id):
    id = get_jwt_identity()
    professor = Professors.query.get(id)
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"
    existing_professor = Professors.query.get(professor_id)
    if not existing_professor:
        return jsonify({"error": "Profesor no encontrado"}), 404  # 404 significa "No encontrado"
    db.session.delete(existing_professor)
    db.session.commit()
    return jsonify({"message": "Profesor eliminado correctamente"})


@api.route('/parents', methods=['GET'])
@jwt_required
def handle_parents():
    id = get_jwt_identity()
    user = Professors.query.get(id)
    if user.rol == 'admin':
        parent = Parents.query.all()
        parent_data = [parent.serialize() for parent in parents]
        return jsonify ({'parents': parent_data}), 200


@api.route('/parents/<int:parents_id>', methods=['GET'])
@jwt_required
def parent_details(parents_id):
    id = get_jwt_identity()
    user = Professors.query.get(id)
    if user.rol == 'admin':
        parent_data = [parent.serialize() for parent in parents]
        return jsonify ({'parents': parent_data}), 200


@api.route('/parents', methods=['POST'])
@jwt_required
def create_parent():
    # Obtener los datos de la solicitud JSON
    data = request.json
    id = get_jwt_identity()
    parents = Parents.query.get(id)
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"

    # Crear un nuevo profesor
    new_parent = Parents(
                         name=data['name'],
                         lastname=data['lastname'],
                         address=data['address'],
                         phone=data['phone'],
                         email_parent=data['email_professor'],
                         students_id=data['students_id'],
                         user_id=data['user_id']
                         )

    # Agregar el nuevo profesor a la sesión y realizar la operación de commit
    db.session.add(new_parent)
    db.session.commit()

    # Devolver una respuesta JSON indicando que el profesor se creó correctamente
    return jsonify({"message": "Representante creado correctamente", "Representate": new_parent.serialize()}), 201


@api.route('/parents/<int:parents_id>', methods=['PUT'])
@jwt_required
def update_parent(parents_id):
    # Obtener los datos de la solicitud JSON
    data = request.json
    id = get_jwt_identity()
    existing_parents = Parents.query.get(parents_id)
    if not existing_professor:
        return jsonify({"error": "Representate no encontrado"}), 404  # 404 significa "No encontrado"
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if existing_professor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"

    # Actualizar los campos del profesor con los nuevos datos
    existing_parents.name = data['name']
    existing_parents.lastname = data['lastname']
    existing_parents.address = data['address']
    existing_parents.phone = data['phone']
    existing_parents.email_parent = data['email_parent']
    existing_parents.students_id = data['students_id']
    existing_parents.user_id = data['user_id']
    # Realizar la operación de commit para aplicar los cambios en la base de datos
    db.session.commit()
    # Devolver una respuesta JSON indicando que el profesor se actualizó correctamente
    return jsonify({"message": "Representate actualizado correctamente", "professor": existing_parents.serialize()})


@api.route('/parents/<int:parents_id>', methods=['DELETE'])
@jwt_required
def delete_parent(parents_id):
    id = get_jwt_identity()
    parents = Parents.query.get(id)
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"
    existing_parents = Parents.query.get(parents_id)
    if not existing_parents:
        return jsonify({"error": "Representante no encontrado"}), 404  # 404 significa "No encontrado"
    db.session.delete(existing_professor)
    db.session.commit()
    return jsonify({"message": "Representante eliminado correctamente"})


@api.route('/parents/students', methods=['GET'])
@jwt_required
def handle_students():
    id = get_jwt_identity()
    user = Professors.query.get(id)
    if user.rol == 'admin':
        student = Students.query.all()
        student_data = [student.serialize() for student in students]
        return jsonify ({'professors': student_data}), 200


@api.route('/parents/students/<int:students_id>', methods=['GET'])
@jwt_required
def student_details(students_id):
    id = get_jwt_identity()
    user = Professors.query.get(id)
    if user.rol == 'admin':
        student_data = [student.serialize() for student in students]
        return jsonify ({'professors': student_data}), 200


@api.route('/parents/students', methods=['POST'])
@jwt_required
def create_student():
    # Obtener los datos de la solicitud JSON
    data = request.json
    id = get_jwt_identity()
    students = Students.query.get(id)
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"

    # Crear un nuevo profesor
    new_student = Students(
                           name=data['name'],
                           lastname=data['lastname'],
                           date_of_birth=data['date_of_birth'],
                           group=data['group'],
                           group_id=data['group_id']
                           )

    # Agregar el nuevo profesor a la sesión y realizar la operación de commit
    db.session.add(new_student)
    db.session.commit()

    # Devolver una respuesta JSON indicando que el profesor se creó correctamente
    return jsonify({"message": "Estudiante creado correctamente", "Representate": new_student.serialize()}), 201


@api.route('/parents/students/<int:students_id>', methods=['PUT'])
@jwt_required
def update_student(students_id):
    # Obtener los datos de la solicitud JSON
    data = request.json
    id = get_jwt_identity()
    existing_students = Students.query.get(students_id)
    if not existing_students:
        return jsonify({"error": "Estudiante no encontrado"}), 404  # 404 significa "No encontrado"
    # Verificar que el usuario que realiza la solicitud sea un administrador
    if existing_professor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"

    # Actualizar los campos del profesor con los nuevos datos
    existing_students.name = data['name']
    existing_students.lastname = data['lastname']
    existing_students.date_of_birth = data['date_of_birth']
    existing_students.group = data['group']
    existing_students.group_id = data['group_id']
    # Realizar la operación de commit para aplicar los cambios en la base de datos
    db.session.commit()
    # Devolver una respuesta JSON indicando que el profesor se actualizó correctamente
    return jsonify({"message": "Estudiante actualizado correctamente", "professor": existing_students.serialize()})


@api.route('/parents/students/<int:students_id>', methods=['DELETE'])
@jwt_required
def delete_student(parents_id):
    id = get_jwt_identity()
    students = Students.query.get(id)
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403 
    existing_students = Students.query.get(students_id)
    if not existing_professor:
        return jsonify({"error": "Estudiante no encontrado"}), 404 
    db.session.delete(existing_students)
    db.session.commit()
    return jsonify({"message": "Estudiante eliminado correctamente"})

  
@api.route('/admin/group/create', methods=['POST'])
@jwt_required
def create_group():
    data = request.json
    id = get_jwt_identity()
    groups = Groups.query.get(id)
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"
    new_group = Groups(
                       name_group=data['name_group'],
                       professor_id=data['professor_id'],
                       student_id=data['student_id']
                       )
    db.session.add(new_group)
    db.session.commit()
    return jsonify({"message": "Grupo creado correctamente", "Grupo": new_group.serialize()}), 201


@api.route('/admin/group/assign', methods=['POST'])
@jwt_required
def group_assign():
    data = request.json
    id = get_jwt_identity()
    groups = Groups.query.get(id)
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  # 403 significa "Prohibido"
    assign_group = Groups(
                          name_group=data['name_group'],
                          professor_id=data['professor_id'],
                          student_id=data['student_id']
                          )
    db.session.add(assign_group)
    db.session.commit()
    return jsonify({"message": "Asignado correctamente", "Grupo": assign_group.serialize()}), 201


@api.route('/admin/group/assign/<int:group_id>', methods=['PUT'])
@jwt_required
def update_group(group_id):
    data = request.json
    id = get_jwt_identity()
    existing_groups = Groups.query.get(group_id)
    if not existing_groups:
        return jsonify({"error": "Grupo no encontrado"}), 404  
    if existing_professor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_groups.name_group = data['name_group']
    existing_groups.professor_id = data['professor_id']
    existing_groups.student_id = data['student_id']
    db.session.commit()
    return jsonify({"message": "Grupo actualizado correctamente", "Grupo": existing_groups.serialize()})


@api.route('/admin/group/assign/<int:group_id>', methods=['DELETE'])
@jwt_required
def delete_student(group_id):
    id = get_jwt_identity()
    groups = Groups.query.get(id)
    if profesor.rol != 'admin':
        return jsonify({"error": "Acceso no autorizado"}), 403 
    existing_groups = Groups.query.get(group_id)
    if not existing_groups:
        return jsonify({"error": "Grupo no encontrado"}), 404 
    db.session.delete(existing_groups)
    db.session.commit()
    return jsonify({"message": "Grupo eliminado correctamente"})
