from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


association_table = db.Table('association',
    db.Column('Students', db.Integer, db.ForeignKey('students.id'), primary_key=True),
    db.Column('GlobalNotifications', db.Integer, db.ForeignKey('global_notifications.id'), primary_key=True)
)


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    is_professor = db.Column(db.Boolean, nullable=False)
    professors = db.relationship('Professors', back_populates='users')

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
    email_professor = db.Column(db.String, unique=True)
    rol = db.Column(db.Enum('admin', 'professor', name='is_admin'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    users = db.relationship('Users', back_populates='professors')
    notifications = db.relationship('Notifications')
    global_notifications = db.relationship('GlobalNotifications', backref='professors')


    def __repr__(self):
        return f'<Professors: {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'address': self.address,
                'phone': self.phone,
                'email_professor': self.users.email,
                'rol': self.rol}


class Parents(db.Model):
    __tablename__ = 'parents'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    address =  db.Column(db.String, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    email_parent = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    users = db.relationship('Users')
    # student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    students = db.relationship('Students')



    def __repr__(self):
        return f'<Parents: {self.id}, {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'address': self.address,
                'phone': self.phone,
                'email_parent': self.users.email,
                'students': self.students.serialize()}


class Students(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('parents.id'))
    notifications = db.relationship('Notifications', backref='students', lazy=True)
    group = db.relationship('Groups', uselist=False)
    global_notification = db.relationship('GlobalNotifications', secondary=association_table)
    

    def __repr__(self):
        return f'<Students: {self.id}, {self.name} {self.lastname}>'
        
    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'date_of_birth': self.date_of_birth,
                'parent_id': self.parent_id}


class Groups(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    name_group = db.Column(db.String, nullable=False)
    professor = db.relationship('Professors', backref='groups')
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    student = db.relationship('Students',)


    def __repr__(self):
        return f'<Groups: {self.id} {self.name_group}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name_group,
                'professor_id': self.professor_id,
                'student_id': [student.serialize() for student in self.students]}


class Notifications(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    eat = db.Column(db.Enum('Comió bien', 'Comió poco', 'No comió', name='eat_enum'))
    sleep = db.Column(db.Enum('Durmió bien','Durmió poco', 'no Durmió', name='sleep_enum'))
    poop = db.Column(db.Boolean)
    notes = db.Column(db.String)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    
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
    type = db.Column(db.Enum('Festivo', 'Evento', 'Huelga', 'Notificación especial', name='type_enum'))
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String)
    url_img = db.Column(db.String)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'))
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'))
    student = db.relationship('Students', secondary=association_table, backref='global_notifications')
    
    
    def __repr__(self):
        return f'<Professors: {self.id} {self.type}>'

    def serialize(self):
        return {'id': self.id,
                'type': self.type,
                'date': self.date,
                'description': self.description,
                'url_img': self.url_img,
                'professor_id': self.professor_id,
                'student_id': self.student_id}