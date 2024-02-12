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
    try:
        if id[1]['is_admin']:
            users= Users.query.all()
            user_data = [user.serialize() for user in users]
            return jsonify ({'user': user_data}), 200
        return jsonify({'error': 'Acceso no autorizado'}), 403             
    except:    
        return jsonify({'error': 'Acceso no autorizado'}), 403


@api.route('/users', methods=['POST']) # arreglado y funcionando 
@jwt_required()
def create_user():
    data = request.json
    id = get_jwt_identity()
    try:
        if id[1]['is_admin']:
            new_user = Users(email=data['email'],
                             password=data['password'],
                             is_professor=data['is_professor'])
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "Usuario creado correctamente", "usuario": new_user.serialize()}), 201
        return jsonify({"error": "Acceso no autorizado, debe ser admin"}), 403 
    except:
        return jsonify({"error": "Acceso no autorizado, debe ser profesor"}), 403

@api.route('/notifications/parents/<int:student_id>', methods=['GET']) # falta arreglar
@jwt_required()
def handle_notifications_parents(student_id): 
    notifications = Notifications.query.filter_by(student_id = student_id)
    results = [row.serialize() for row in notifications]
    return jsonify(results), 200


@api.route('/notifications/professor', methods=['GET']) # falta arreglar
@jwt_required()
def handle_notifications_professor():
    id = get_jwt_identity()
    notifications = Notifications.query.filter_by(professor_id = id[0]['id'])
    results = [row.serialize() for row in notifications]
    return jsonify(results), 200

@api.route('/notifications', methods=['POST'])
@jwt_required()
def create_notification():
    data = request.json
    id = get_jwt_identity()
    print(id[0]["is_professor"])
    try:
        if id[0]["is_professor"]:
            
            new_notification = Notifications(date=data['date'],
                                             eat=data['eat'],
                                             sleep=data['sleep'],
                                             poop=data['poop'],
                                             notes=data['notes'],
                                             professor_id= id[1]['id'],
                                             student_id=data['student_id'],                                             )
            db.session.add(new_notification)
            db.session.commit()
            return jsonify({"message": "Notificacíon creada correctamente", "notificacíon": new_notification.serialize()}), 201
        return jsonify({"error": "Acceso no autorizado, debe ser admin"}), 403 
    except Exception as e: 
        print (e)
        return jsonify({"error": "Acceso no autorizado, debe ser profesor"}), 403


@api.route('/notifications/<int:notifications_id>', methods=['PUT'])
@jwt_required()
def update_notification(notifications_id):
    data = request.json
    id = get_jwt_identity()
    existing_notification = Notifications.query.get(notifications_id)
    if not existing_students:
        return jsonify({"error": "Notificación no encontrada"}), 404  
    if id[1]['is_admin']:
        existing_notification.date = data['date']
        existing_notification.eat = data['eat']
        existing_notification.sleep = data['sleep']
        existing_notification.poop = data['poop']
        existing_notification.notes = data['notes']
        db.session.commit()
        return jsonify({"message": "Notificacíon actualizada correctamente", "notificacíon": existing_notification.serialize()})
    return jsonify({"error": "Acceso no autorizado"}), 403  


@api.route('/notifications/<int:notifications_id>', methods=['DELETE']) # en teoria funciona
@jwt_required()
def delete_notifications(notifications_id):
    id = get_jwt_identity()
    if id[1]['is_admin']:
        existing_notification = Notifications.query.get(notifications_id)
        db.session.delete(existing_notification)
        db.session.commit()
        return jsonify({"message": "Notificacíon eliminada correctamente"})
    return jsonify({"error": "Acceso no autorizado"}), 403 
    return jsonify({"error": "Notificacíon no encontrada"}), 404


@api.route('/globalnotifications', methods=['GET']) # no funciona (id=id)
@jwt_required()
def handle_globalnotifications():
    global_notifications = GlobalNotifications.query.all()
    results = [row.serialize() for row in global_notifications]
    return jsonify(results), 200
    


@api.route('/globalnotifications', methods=['POST']) # arreglado
@jwt_required()
def create_globalnotification():
    data = request.json
    id = get_jwt_identity()
    try:
        if id[1]['is_admin']:
            new_globalnotification = GlobalNotifications(kind=data['kind'],
                                                         date=data['date'],
                                                         description=data['description'],
                                                         url_img=data['url_img'])
            db.session.add(new_globalnotification)
            db.session.commit()
            return jsonify({"message": "Notificacíon global creada correctamente", "notificacíon global": new_globalnotification.serialize()}), 201
        return jsonify({"error": "Acceso no autorizado, debe ser admin"}), 403 
    except:
        return jsonify({"error": "Acceso no autorizado, debe ser profesor"}), 403 


@api.route('/globalnotifications/<int:globalnotifications_id>', methods=['PUT']) # arreglado
@jwt_required()
def update_globalnotifications(globalnotifications_id):
    data = request.json
    id = get_jwt_identity()
    existing_globalnotifications = GlobalNotifications.query.get(globalnotifications_id)
    if not existing_globalnotifications:
        return jsonify({"error": "Profesor no encontrado"}), 404  
    if id[1]['is_admin']:
        existing_globalnotifications.kind = data['kind']
        existing_globalnotifications.date = data['date']
        existing_globalnotifications.description = data['description']
        existing_globalnotifications.url_img = data['url_img']
        #existing_globalnotifications.professor_id = data['professor_id']   
        db.session.commit()
        return jsonify({"message": "Notificacíon global actualizada correctamente", "notificacíon global": existing_globalnotifications.serialize()})
    return jsonify({"error": "Acceso no autorizado"}), 403


@api.route('/globalnotifications/<int:globalnotifications_id>', methods=['DELETE']) # En teoria funciona
@jwt_required()
def delete_globalnotifications(globalnotifications_id):
    id = get_jwt_identity()
    if id[1]['is_admin']:
        existing_globalnotifications = GlobalNotifications.query.get(globalnotifications_id)
        db.session.delete(existing_globalnotifications)
        db.session.commit()
        return jsonify({"message": "Notificacíon global eliminada correctamente"})
    return jsonify({"error": "Acceso no autorizado"}), 403 
    return jsonify({"error": "Notificacíon global no encontrado"}), 404


@api.route('/professors', methods=['GET']) #arreglado y funcionando
@jwt_required()
def handle_professor():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id']) 
    if user.is_admin:
        professors = Professors.query.all() # ver mas adelante mostrar el email. se puede utilizar un .join
        professor_data = [professor.serialize() for professor in professors]
        return jsonify ({'professors': professor_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/professors/<int:professor_id>', methods=['GET']) #arreglado y funcionando
@jwt_required()
def professor_details(professor_id):
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        professor = Professors.query.filter_by(id=professor_id).first() 
        return jsonify(professor.serialize()), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

# @api.route('/professors/user/<int:professor_id>', methods=['GET']) #arreglado y funcionando
# @jwt_required()
# def professor_details_user(professor_id):
#     id = get_jwt_identity()
#     user = Professors.query.get(id[0]['id'])
#     if user.id:
#         professor = Professors.query.filter_by(id=professor_id).first() 
#         return jsonify(professor.serialize()), 200
#     return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/professors', methods=['POST']) # arreglado y funcionando 
@jwt_required()
def create_professor():
    data = request.json
    id = get_jwt_identity()
    try:
        if id[1]['is_admin']:
            new_professor = Professors(name=data['name'],
                                       lastname=data['lastname'],
                                       address=data['address'],
                                       phone=data['phone'],
                                       is_admin=data['is_admin'])
            db.session.add(new_professor)
            db.session.commit()
            return jsonify({"message": "Profesor creado correctamente", "professor": new_professor.serialize()}), 201
        return jsonify({"error": "Acceso no autorizado, debe ser admin"}), 403 
    except:
        return jsonify({"error": "Acceso no autorizado, debe ser profesor"}), 403


@api.route('/professors/<int:professor_id>', methods=['PUT']) #Arreglado y funcionando 
@jwt_required()
def update_professor(professor_id):
    data = request.json
    id = get_jwt_identity()
    existing_professor = Professors.query.get(professor_id)
    if not existing_professor:
        return jsonify({"error": "Profesor no encontrado"}), 404  
    if id[1]['is_admin']:
        existing_professor.name = data['name']
        existing_professor.lastname = data['lastname']
        existing_professor.address = data['address']
        existing_professor.phone = data['phone']
        existing_professor.is_admin = data['is_admin']
        db.session.commit()
        return jsonify({"message": "Profesor actualizado correctamente", "Profesor": existing_professor.serialize()})
    return jsonify({"error": "Acceso no autorizado"}), 403 


@api.route('/professors/<int:professor_id>', methods=['DELETE']) # En teoria arreglado
@jwt_required()
def delete_professor(professor_id):
    id = get_jwt_identity()
    if id[1]['is_admin']:
        existing_professor = Professors.query.get(professor_id)
        db.session.delete(existing_professor)
        db.session.commit()
        return jsonify({"message": "Profesor eliminado correctamente"})
    return jsonify({"error": "Acceso no autorizado"}), 403 
    return jsonify({"error": "Profesor no encontrado"}), 404


@api.route('/parents', methods=['GET']) # Arreglado y funcionando
@jwt_required()
def handle_parents():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        parents = Parents.query.all()
        parent_data = [parent.serialize() for parent in parents]
        return jsonify ({'parents': parent_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/parents/<int:parents_id>', methods=['GET']) # Arreglado y funcionando
@jwt_required()
def parents_details(parents_id):
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        parents = Parents.query.filter_by(id=parents_id).first() 
        return jsonify(parents.serialize()), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/parents', methods=['POST']) # Arreglado y funcionando
@jwt_required()
def create_parent():
    data = request.json
    id = get_jwt_identity()
    try:
        if id[1]['is_admin']:
            new_parent = Parents(name=data['name'],
                                 lastname=data['lastname'],
                                 address=data['address'],
                                 phone=data['phone'])
            db.session.add(new_parent)
            db.session.commit()
            return jsonify({"message": "Representante creado correctamente", "Representate": new_parent.serialize()}), 201
        return jsonify({"error": "Acceso no autorizado, debe ser admin"}), 403 
    except:
        return jsonify({"error": "Acceso no autorizado, debe ser profesor"}), 403


@api.route('/parents/<int:parents_id>', methods=['PUT']) # Arreglado y funcionando
@jwt_required()
def update_parent(parents_id):
    data = request.json
    id = get_jwt_identity()
    existing_parents = Parents.query.get(parents_id)
    if not existing_parents:
        return jsonify({"error": "Representate no encontrado"}), 404  
    if id[1]['is_admin']:
        existing_parents.name = data['name']
        existing_parents.lastname = data['lastname']
        existing_parents.address = data['address']
        existing_parents.phone = data['phone']
        db.session.commit()
        return jsonify({"message": "Representate actualizado correctamente", "Representante": existing_parents.serialize()})
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/parents/<int:parents_id>', methods=['DELETE']) #En teoria Arreglado
@jwt_required()
def delete_parent(parents_id):
    id = get_jwt_identity()
    if id[1]['is_admin']:
        existing_parents = Parents.query.get(parents_id)
        db.session.delete(existing_parents)
        db.session.commit()
        return jsonify({"message": "Representate eliminado correctamente"})
    return jsonify({"error": "Acceso no autorizado"}), 403 
    return jsonify({"error": "Representate no encontrado"}), 404


@api.route('/students', methods=['GET']) # Arreglado y funcionando hace lo mismo que /students/list
@jwt_required()
def handle_students():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        students = Students.query.all()
        student_data = [student.serialize() for student in students]
        return jsonify ({'students': student_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403

@api.route('/students/list', methods=['GET']) # Arreglado y funcionando hace lo mismo que '/students'
@jwt_required()
def handle_studentslist():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.id:
        students = Students.query.all()
        student_data = [student.serialize() for student in students]
        return jsonify ({'data': student_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403


@api.route('/students/<int:students_id>', methods=['GET']) # Arreglado y funcionando
@jwt_required()
def students_details(students_id):
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.id:
        students = Students.query.filter_by(id=students_id).first() 
        return jsonify(students.serialize()), 200
    return jsonify({"error": "Acceso no autorizado"}), 403


@api.route('/students', methods=['POST']) # Arreglado y funcionando
@jwt_required()
def create_student():
    data = request.json
    id = get_jwt_identity()
    try:
        if id[1]['is_admin']:
            new_student = Students(name=data['name'],
                                   lastname=data['lastname'],
                                   date_of_birth=data['date_of_birth'],
                                   parent_id=data['parent_id'],
                                   group_id=data['group_id'])
            db.session.add(new_student)
            db.session.commit()
            return jsonify({"message": "Estudiante creado correctamente", "Representate": new_student.serialize()}), 201
        return jsonify({"error": "Acceso no autorizado, debe ser admin"}), 403 
    except:
        return jsonify({"error": "Acceso no autorizado, debe ser profesor"}), 403    


@api.route('/students/<int:students_id>', methods=['PUT']) # Arreglado y funcionando
@jwt_required()
def update_student(students_id):
    data = request.json
    id = get_jwt_identity()
    existing_students = Students.query.get(students_id)
    if not existing_students:
        return jsonify({"error": "Estudiante no encontrado"}), 404  
    if id[1]['is_admin']:
        existing_students.name = data['name']
        existing_students.lastname = data['lastname']
        existing_students.date_of_birth = data['date_of_birth']
        existing_students.parent_id = data['parent_id']
        existing_students.group_id = data['group_id']
        db.session.commit()
        return jsonify({"message": "Estudiante actualizado correctamente", "Representante": existing_students.serialize()})
    return jsonify({"error": "Acceso no autorizado"}), 403  


@api.route('/students/<int:students_id>', methods=['DELETE']) # Arreglado y funcionando
@jwt_required()
def delete_student(students_id):
    id = get_jwt_identity()
    if id[1]['is_admin']:
        existing_students = Students.query.get(students_id)
        db.session.delete(existing_students)
        db.session.commit()
        return jsonify({"message": "Estudiante eliminado correctamente"})
    return jsonify({"error": "Acceso no autorizado"}), 403 
    return jsonify({"error": "Estudiante no encontrado"}), 404 

  
@api.route('/admin/group/create', methods=['POST']) # Arreglado y funcionando
@jwt_required()
def create_group():
    data = request.json
    id = get_jwt_identity()
    try:
        if id[1]['is_admin']:
            new_group = Groups(name=data['name'],
                               professor_id=data['professor_id'])
            db.session.add(new_group)
            db.session.commit()
            return jsonify({"message": "Grupo creado correctamente", "Grupo": new_group.serialize()}), 201
        return jsonify({"error": "Acceso no autorizado, debe ser admin"}), 403 
    except:
        return jsonify({"error": "Acceso no autorizado, debe ser profesor"}), 403


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


@api.route('/admin/group/assign/<int:group_id>', methods=['PUT']) # Arreglado y funcionando
@jwt_required()
def update_group(group_id):
    data = request.json
    id = get_jwt_identity()
    existing_groups = Groups.query.get(group_id)
    if not existing_groups:
        return jsonify({"error": "Grupo no encontrado"}), 404  
    if id[1]['is_admin']:
        existing_groups.name_group = data['name_group']
        existing_groups.professor = data['professor']
        db.session.commit()
        return jsonify({"message": "Grupo actualizado correctamente", "Grupo": existing_groups.serialize()})
    return jsonify({"error": "Acceso no autorizado"}), 403


# @api.route('/admin/group/assign/<int:group_id>', methods=['DELETE'])
# @jwt_required()
# def delete_group(group_id):
#     id = get_jwt_identity()
#     if not professor.is_admin: #TODO: corregir con try except 
#         return jsonify({"error": "Acceso no autorizado"}), 403 
#     existing_groups = Groups.query.get(group_id)
#     if not existing_groups:
#         return jsonify({"error": "Grupo no encontrado"}), 404 
#     db.session.delete(existing_groups)
#     db.session.commit()
#     return jsonify({"message": "Grupo eliminado correctamente"})


@api.route('/groups', methods=['GET']) # Arreglado y funcionando
@jwt_required()
def handle_groups():
    id = get_jwt_identity()
    user = Professors.query.get(id[0]['id'])
    if user.is_admin:
        groups = Groups.query.all()
        group_data = [group.serialize() for group in groups]
        return jsonify ({'groups': group_data}), 200
    return jsonify({"error": "Acceso no autorizado"}), 403


@api.route("/group_by_professor", methods=['GET'])
@jwt_required()
def handle_group_by_professor():
    id = get_jwt_identity()
    user = Professors.query.get(id[1]['id'])
    print(id[1])
    print(user)
    print(id)
    if user:
        groups = Groups.query.filter_by(professor_id = id[1]["id"])
        data = [group.serialize() for group in groups]
        print("data in Groups")
        return jsonify({"data": data })
    return jsonify({"msg": "user not found"}), 404

@api.route("/student_by_group/<int:id_group>", methods=['GET'])
@jwt_required()
def handle_student_by_group(id_group):
    id = get_jwt_identity()
    user = Professors.query.get(id[1]['id'])
    if user:
        students = Students.query.filter_by(group_id = id_group)
        data = [student.serialize() for student in students]
        print("data in students")
        return jsonify({"data": data }), 200
    return jsonify({"msg": "user not found"}), 404
