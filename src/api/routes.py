"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Professors, Parents, Groups, Students, Notifications, GlobalNotifications 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import bcrypt


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

 
@api.route('/login', methods=['POST'])
def handle_login():
    response_body = data_serialize = {}
    email = request.json.get('email')
    password = request.json.get('password')
    if not email:
        return jsonify({'message': 'Falta introducir el Email.'}), 401
    if not password:
        return jsonify({'message': 'Introduzca la contraseña'}), 401
    user = Users.query.filter_by(email=email, password=password).first()
    if user:
            if user.is_professor:
                user_professor = db.session.execute(db.select(Professors).where(Professors.user_id == user.serialize()["id"])).scalar()
                data_serialize = user_professor.serialize()
            else:
                user_parents = db.session.execute(db.select(Parents).where(Parents.user_id == user.serialize()["id"])).scalar()
                parents_students = db.session.execute(db.select(Students).where(Students.parent_id == user_parents.id)).scalars()
                data_serialize = user_parents.serialize()
                data_serialize['childs'] = []
                for row in parents_students:
                    data_serialize['childs'].append(row.serialize())
            access_token = create_access_token(identity=[user.serialize(), data_serialize])
            response_body["message"] = "Login"
            response_body["results"] = {"user": user.serialize(), "profile": data_serialize}
            response_body["access_token"] = access_token
            return response_body, 200
    response_body["message"] = "Usted no es usuario"
    return response_body, 403           


@api.route('/logout', methods=["POST"])  
@jwt_required()
def handle_logout():
    user_id = get_jwt_identity()[0]  
    response_body = {'message': 'Logout successful'}
    return response_body, 200


@api.route('/users', methods=['GET'])
@jwt_required()
def handle_users():
    id = get_jwt_identity()
    response_body = results = {}
    if id:
        user = Users.query.get(id[0]['id'])
        user = user.serialize()
        if user.is_admin:
                professor = Professors.query.filter_by(user_id = id)
                parents = Parents.query.filter_by(user_id = id)
                return jsonify(users), 200           
    else:
        return jsonify({'error': 'usuario no logueado'}), 403


@api.route('/notifications', methods=['GET'])
@jwt_required()
def handle_notifications():
    id = get_jwt_identity()
    notifications = Notifications.query.filter_by(student_id = id)
    notifications = [notification.serialize() for notification in notifications]
    return jsonify(notifications), 200


@api.route('/notifications', methods=['POST'])
@jwt_required()
def create_notification():
    data = request.json
    id = get_jwt_identity()
    professor = Professors.query.get(id[0]['id'])
    if professor != 'professor':
        return jsonify({"error": "Acceso no autorizado"}), 403 
    new_notification = Notifications(
                                     date=data['date'],
                                     eat=data['eat'],
                                     sleep=data['sleep'],
                                     poop=data['poop'],
                                     notes=data['notes'],
                                     professor_id=data['professor_id'],
                                     student_id=data['student_id']
                                     )
    db.session.add(new_notification)
    db.session.commit()
    return jsonify({"message": "Notificacíon creada correctamente", "notificacíon": new_notification.serialize()}), 201


@api.route('/notifications/<int:notifications_id>', methods=['PUT'])
@jwt_required()
def update_notification(notifications_id):
    data = request.json
    id = get_jwt_identity()
    existing_notification = Notifications.query.get(notifications_id)
    if not existing_professor:
        return jsonify({"error": "Profesor no encontrado"}), 404  
    if existing_professor.professor != 'professor':
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_notification.date = data['date']
    existing_notification.eat = data['eat']
    existing_notification.sleep = data['sleep']
    existing_notification.poop = data['poop']
    existing_notification.notes = data['notes']
    existing_notification.professor_id = data['professor_id']
    existing_notification.student_id = data['student_id']
    db.session.commit()
    return jsonify({"message": "Notificacíon actualizada correctamente", "notificacíon": existing_notification.serialize()})


@api.route('/notifications/<int:notifications_id>', methods=['DELETE'])
@jwt_required()
def delete_notifications(notifications_id):
    id = get_jwt_identity()
    professor = Professors.query.get(id[0]['id'])
    if professor != 'professor':
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_notification = Notifications.query.get(professor_id)
    if not existing_notification:
        return jsonify({"error": "Notificacíon no encontrado"}), 404  
    db.session.delete(existing_notification)
    db.session.commit()
    return jsonify({"message": "Notificacíon eliminada correctamente"})


@api.route('/globalnotifications', methods=['GET'])
@jwt_required()
def handle_globalnotifications():
    id = get_jwt_identity()
    global_notifications = GlobalNotifications.query.filter_by(professor_id = id)
    global_notifications = [global_notification.serialize() for global_notification in global_notifications]
    return jsonify(global_notifications), 200


@api.route('/globalnotifications', methods=['POST'])
@jwt_required()
def create_globalnotification():
    data = request.json
    id = get_jwt_identity()
    professor = Professors.query.get(id[0]['id'])
    if professor != 'professor':
        return jsonify({"error": "Acceso no autorizado"}), 403 
    new_globalnotification = GlobalNotifications(
                                                 kind=data['kind'],
                                                 date=data['date'],
                                                 description=data['description'],
                                                 url_img=data['url_img'],
                                                 professor_id=data['professor_id'],
                                                 professors=data['professors']
                                                 )
    db.session.add(new_globalnotification)
    db.session.commit()
    return jsonify({"message": "Notificacíon global creada correctamente", "notificacíon global": new_globalnotification.serialize()}), 201


@api.route('/globalnotifications/<int:globalnotifications_id>', methods=['PUT'])
@jwt_required()
def update_globalnotifications(globalnotifications_id):
    data = request.json
    id = get_jwt_identity()
    existing_globalnotifications = GlobalNotifications.query.get(globalnotifications_id)
    if not existing_professor:
        return jsonify({"error": "Profesor no encontrado"}), 404  
    if existing_professor.professor != 'professor':
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_globalnotifications.kind = data['kind']
    existing_globalnotifications.date = data['date']
    existing_globalnotifications.description = data['description']
    existing_globalnotifications.url_img = data['url_img']
    existing_globalnotifications.professor_id = data['professor_id']
    existing_globalnotifications.professors = data['professors']
    db.session.commit()
    return jsonify({"message": "Notificacíon global actualizada correctamente", "notificacíon global": existing_globalnotifications.serialize()})


@api.route('/globalnotifications/<int:globalnotifications_id>', methods=['DELETE'])
@jwt_required()
def delete_globalnotifications(globalnotifications_id):
    id = get_jwt_identity()
    professor = Professors.query.get(id[0]['id'])
    if professor != 'professor':
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_globalnotifications = GlobalNotifications.query.get(professor_id)
    if not existing_globalnotifications:
        return jsonify({"error": "Notificacíon no encontrado"}), 404  
    db.session.delete(existing_globalnotifications)
    db.session.commit()
    return jsonify({"message": "Notificacíon global eliminada correctamente"})


@api.route('/professors', methods=['GET'])
@jwt_required()
def handle_professor():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        professors = Professors.query.all()
        professor_data = [professor.serialize() for professor in professors]
        return jsonify ({'professors': professor_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/professors/<int:professor_id>', methods=['GET'])
@jwt_required()
def professor_details(professor_id):
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        professor = Professors.query.filter_by(id=professor_id).first() 
        return jsonify(professor.serialize()), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/professors', methods=['POST'])
@jwt_required()
def create_professor():
    data = request.json
    id = get_jwt_identity()
    professor = Professors.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403 
    new_professor = Professors(
                               name=data['name'],
                               lastname=data['lastname'],
                               address=data['address'],
                               phone=data['phone'],
                               is_admin=data['is_admin'],
                               user_id=data['user_id']
                               )
    db.session.add(new_professor)
    db.session.commit()
    return jsonify({"message": "Profesor creado correctamente", "professor": new_professor.serialize()}), 201


@api.route('/professors/<int:professor_id>', methods=['PUT'])
@jwt_required()
def update_professor(professor_id):
    data = request.json
    id = get_jwt_identity()
    existing_professor = Professors.query.get(professor_id)
    if not existing_professor:
        return jsonify({"error": "Profesor no encontrado"}), 404  
    if existing_professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_professor.name = data['name']
    existing_professor.lastname = data['lastname']
    existing_professor.address = data['address']
    existing_professor.phone = data['phone']
    existing_professor.is_admin = data['is_admin']
    db.session.commit()
    return jsonify({"message": "Profesor actualizado correctamente", "professor": existing_professor.serialize()})


@api.route('/professors/<int:professor_id>', methods=['DELETE'])
@jwt_required()
def delete_professor(professor_id):
    id = get_jwt_identity()
    professor = Professors.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_professor = Professors.query.get(professor_id)
    if not existing_professor:
        return jsonify({"error": "Profesor no encontrado"}), 404  
    db.session.delete(existing_professor)
    db.session.commit()
    return jsonify({"message": "Profesor eliminado correctamente"})


@api.route('/parents', methods=['GET'])
@jwt_required()
def handle_parents():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        parents = Parents.query.all()
        parent_data = [parent.serialize() for parent in parents]
        return jsonify ({'parents': parent_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/parents/<int:parents_id>', methods=['GET'])
@jwt_required()
def parents_details(parents_id):
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        parents = Parents.query.filter_by(id=parents_id).first() 
        return jsonify(parents.serialize()), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/parents', methods=['POST'])
@jwt_required()
def create_parent():
    data = request.json
    id = get_jwt_identity()
    parents = Parents.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403 
    new_parent = Parents(
                         name=data['name'],
                         lastname=data['lastname'],
                         address=data['address'],
                         phone=data['phone'],
                         user_id=data['user_id']
                         )
    db.session.add(new_parent)
    db.session.commit()
    return jsonify({"message": "Representante creado correctamente", "Representate": new_parent.serialize()}), 201


@api.route('/parents/<int:parents_id>', methods=['PUT'])
@jwt_required()
def update_parent(parents_id):
    data = request.json
    id = get_jwt_identity()
    existing_parents = Parents.query.get(parents_id)
    if not existing_professor:
        return jsonify({"error": "Representate no encontrado"}), 404  
    if existing_professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403 
    existing_parents.name = data['name']
    existing_parents.lastname = data['lastname']
    existing_parents.address = data['address']
    existing_parents.phone = data['phone']
    existing_parents.user_id = data['user_id']
    db.session.commit()
    return jsonify({"message": "Representate actualizado correctamente", "professor": existing_parents.serialize()})


@api.route('/parents/<int:parents_id>', methods=['DELETE'])
@jwt_required()
def delete_parent(parents_id):
    id = get_jwt_identity()
    parents = Parents.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_parents = Parents.query.get(parents_id)
    if not existing_parents:
        return jsonify({"error": "Representante no encontrado"}), 404 
    db.session.delete(existing_professor)
    db.session.commit()
    return jsonify({"message": "Representante eliminado correctamente"})


@api.route('/students', methods=['GET'])
@jwt_required()
def handle_students():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        students = Students.query.all()
        student_data = [student.serialize() for student in students]
        return jsonify ({'professors': student_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/students/<int:students_id>', methods=['GET'])
@jwt_required()
def students_details(students_id):
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        students = Students.query.filter_by(id=students_id).first() 
        return jsonify(students.serialize()), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/students', methods=['POST'])
@jwt_required()
def create_student():
    data = request.json
    id = get_jwt_identity()
    students = Students.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403  
    new_student = Students(
                           name=data['name'],
                           lastname=data['lastname'],
                           date_of_birth=data['date_of_birth'],
                           parent_id=data['parent_id'],
                           parents=data['parents'],
                           group=data['group'],
                           group_id=data['group_id']
                           )
    db.session.add(new_student)
    db.session.commit()
    return jsonify({"message": "Estudiante creado correctamente", "Representate": new_student.serialize()}), 201


@api.route('/students/<int:students_id>', methods=['PUT'])
@jwt_required()
def update_student(students_id):
    data = request.json
    id = get_jwt_identity()
    existing_students = Students.query.get(students_id)
    if not existing_students:
        return jsonify({"error": "Estudiante no encontrado"}), 404  
    if existing_professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_students.name = data['name']
    existing_students.lastname = data['lastname']
    existing_students.date_of_birth = data['date_of_birth']
    existing_students.parent_id = data['parent_id']
    existing_students.parents = data['parents']
    existing_students.group = data['group']
    existing_students.group_id = data['group_id']
    db.session.commit()
    return jsonify({"message": "Estudiante actualizado correctamente", "professor": existing_students.serialize()})


@api.route('/students/<int:students_id>', methods=['DELETE'])
@jwt_required()
def delete_student(parents_id):
    id = get_jwt_identity()
    students = Students.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403 
    existing_students = Students.query.get(students_id)
    if not existing_professor:
        return jsonify({"error": "Estudiante no encontrado"}), 404 
    db.session.delete(existing_students)
    db.session.commit()
    return jsonify({"message": "Estudiante eliminado correctamente"})

  
@api.route('/admin/group/create', methods=['POST'])
@jwt_required()
def create_group():
    data = request.json
    id = get_jwt_identity()
    groups = Groups.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403  
    new_group = Groups(
                       name=data['group'],
                       professor_id=data['professor_id'],
                       professor=data['professor']
                       )
    db.session.add(new_group)
    db.session.commit()
    return jsonify({"message": "Grupo creado correctamente", "Grupo": new_group.serialize()}), 201


# @api.route('/admin/group/assign', methods=['POST'])
# @jwt_required()
# def group_assign():
#     data = request.json
#     id = get_jwt_identity()
#     groups = Groups.query.get(id)
#     if profesor.rol != 'admin':
#         return jsonify({"error": "Acceso no autorizado"}), 403 
#     assign_group = Groups(
#                           name_group=data['name_group'],
#                           professor_id=data['professor_id'],
#                           student_id=data['student_id']
#                           )
#     db.session.add(assign_group)
#     db.session.commit()
#     return jsonify({"message": "Asignado correctamente", "Grupo": assign_group.serialize()}), 201


@api.route('/admin/group/assign/<int:group_id>', methods=['PUT'])
@jwt_required()
def update_group(group_id):
    data = request.json
    id = get_jwt_identity()
    existing_groups = Groups.query.get(group_id)
    if not existing_groups:
        return jsonify({"error": "Grupo no encontrado"}), 404  
    if existing_professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403  
    existing_groups.name_group = data['name_group']
    existing_groups.professor_id = data['professor_id']
    existing_groups.professor = data['professor']
    db.session.commit()
    return jsonify({"message": "Grupo actualizado correctamente", "Grupo": existing_groups.serialize()})


@api.route('/admin/group/assign/<int:group_id>', methods=['DELETE'])
@jwt_required()
def delete_group(group_id):
    id = get_jwt_identity()
    groups = Groups.query.get(id)
    if professor.is_admin:
        return jsonify({"error": "Acceso no autorizado"}), 403 
    existing_groups = Groups.query.get(group_id)
    if not existing_groups:
        return jsonify({"error": "Grupo no encontrado"}), 404 
    db.session.delete(existing_groups)
    db.session.commit()
    return jsonify({"message": "Grupo eliminado correctamente"})


@api.route('/groups', methods=['GET'])
@jwt_required()
def handle_groups():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        groups = Groups.query.all()
        group_data = [group.serialize() for group in groups]
        return jsonify ({'groups': group_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403



