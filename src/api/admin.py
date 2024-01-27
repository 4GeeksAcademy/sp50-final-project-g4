import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Professors, Parents, Students, Groups, Notifications, GlobalNotifications


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the Users model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Professors, db.session))
    admin.add_view(ModelView(Parents, db.session))
    admin.add_view(ModelView(Students, db.session))
    admin.add_view(ModelView(Groups, db.session))
    admin.add_view(ModelView(Notifications, db.session))
    admin.add_view(ModelView(GlobalNotifications, db.session))
    
    """
    You can duplicate that line to add mew models
    admin.add_view(ModelView(YourModelName, db.session))
    """
