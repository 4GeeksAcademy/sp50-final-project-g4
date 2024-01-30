from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    is_professor = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_professor': self.is_professor}


class Professors(db.Model):
    __tablename__ = 'professors'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    address =  db.Column(db.String, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    is_admin = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    users = db.relationship('Users')


    def __repr__(self):
        return f'<Professors: {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'address': self.address,
                'phone': self.phone,
                'is_admin': self.is_admin,
                'user_id': self.user_id}


class Parents(db.Model):
    __tablename__ = 'parents'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    address =  db.Column(db.String, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    users = db.relationship('Users')



    def __repr__(self):
        return f'<Parents: {self.id}, {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'address': self.address,
                'phone': self.phone,
                'user_id': self.user_id}


class Students(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'))
    parents = db.relationship('Parents', foreign_keys=[parent_id])
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    groups = db.relationship('Groups', foreign_keys=[group_id])
    

    def __repr__(self):
        return f'<Students: {self.id}, {self.name} {self.lastname}>'
        
    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'date_of_birth': self.date_of_birth,
                'parent_id': self.parent_id,
                'group_id': self.group_id}


class Groups(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    name= db.Column(db.String, nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    professor = db.relationship('Professors')


    def __repr__(self):
        return f'<Groups: {self.id} {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'professor_id': self.professor_id}


class Notifications(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    eat = db.Column(db.Enum('Comió bien', 'Comió poco', 'No comió', name='eat'))
    sleep = db.Column(db.Enum('Durmió bien','Durmió poco', 'no Durmió', name='sleep'))
    poop = db.Column(db.Boolean)
    notes = db.Column(db.String)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    professors = db.relationship('Professors', foreign_keys=[professor_id])
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    students = db.relationship('Students', foreign_keys=[student_id])
    
    def __repr__(self):
        return f'<Professors: {self.id}>'

    def serialize(self):
        return {'id': self.id,
                'date': str(self.date),
                'eat': self.eat,
                'sleep': self.sleep,
                'poop': self.poop,
                'notes': self.notes,
                'student_id': self.student_id,
                'professor_id': self.professor_id}


class GlobalNotifications(db.Model):
    __tablename__ = 'global_notifications'
    id = db.Column(db.Integer, primary_key=True)
    kind = db.Column(db.Enum('Festivo', 'Evento', 'Huelga', 'Notificación especial', name='kind'))
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String)
    url_img = db.Column(db.String)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    professors = db.relationship('Professors')
    
    
    def __repr__(self):
        return f'<Professors: {self.id} {self.kind}>'

    def serialize(self):
        return {'id': self.id,
                'type': self.kind,
                'date': self.date,
                'description': self.description,
                'url_img': self.url_img,
                'professor_id': self.professor_id}



# user, like is_admin, generate password.
# si no esta validado, pedir que la cambie.
# Agregar un campo en la base "is_validate"
# hacer un endpoint para cambiar contraseña, pedir 1er contraseña, contraseña nueva y id.
# Validar si la 1er contraseña es ok, validar y reemplazar.
