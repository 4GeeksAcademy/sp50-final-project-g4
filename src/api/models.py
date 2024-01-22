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
    email_professor = db.Column(db.String, unique=True)
    rol = db.Column(db.Enum('admin', 'professor', 'parent'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    users = db.relationship(Users, back_populates='professors', uselist=False)

    def __repr__(self):
        return f'<Professors: {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.name,
                'address': self.name,
                'phone': self.name,
                'email_professor': self.name,
                'rol': self.name,
                'is_professor': self.is_professor}


class Parents(db.Model):
    __tablename__ = 'parents'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    address =  db.Column(db.String, nullable=False)
    phone = db.Column(db.Integer, nullable=False)
    phone_2 = db.Column(db.Integer)
    email_parent = db.Column(db.String, unique=True)
    email_parent_2 = db.Column(db.String, unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    users = db.relationship(Users, back_populates='parents', uselist=False)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), unique=True)
    students = db.relationship(Students)

    def __repr__(self):
        return f'<Parents: {self.id}, {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'is_professor': self.is_professor}


class Students(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'), unique=True)
    group = db.relationship(Groups, back_populates='students', uselist=False)

    def __repr__(self):
        return f'<Students: {self.id}, {self.name} {self.lastname}>'
        
    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'lastname': self.lastname,
                'date_of_birth': self.date_of_birth}


class Groups(db.Model):
    __tablename__ = 'groups'
    id = db.Column(db.Integer, primary_key=True)
    name_group = db.Column(db.String, nullable=False)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'), unique=True)
    professors = db.relationship(Professors, back_populates='group', uselist=False)

    def __repr__(self):
        return f'<Groups: {self.name_group}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name_group,
                'is_professor': self.professor_id}


class Notifications(db.Model):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    eat = db.Column(db.Enum('Comió bien', 'Comió poco', 'No comió'))
    sleep = db.Column(db.Enum('Durmió bien','Durmió poco', 'no Durmió'))
    poop = db.Column(db.Boolean)
    notes = db.Column(db.String)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'), unique=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), unique=True)
    professors = db.relationship(Professors, back_populates='notifications', uselist=False)
    students = db.relationship(Students)
    
    def __repr__(self):
        return f'<Professors: {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'date': str(self.date),
                'eat': self.eat,
                'sleep': self.sleep,
                'poop': self.poop,
                'notes': self.notes,
                'student_id': self.student_id}


class GlobalNotifications(db.Model):
    __tablename__ = 'global_notifications'
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Enum('Comió bien','Comió poco', 'No comió'))
    date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String)
    url_img = db.Column(db.String)
    professor_id = db.Column(db.Integer, db.ForeignKey('professors.id'), unique=True)
    professors = db.relationship(Professors, back_populates='global_notification', uselist=False)
    
    def __repr__(self):
        return f'<Professors: {self.name} {self.lastname}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'is_professor': self.is_professor}