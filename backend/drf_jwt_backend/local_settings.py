# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-w_p7l5ki02hy!h9$#y@n%34a4i+wj6$fynd-p*iq+b=u%w4fxh'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'capstone_date_night_generator',
        'HOST': 'localhost',
        'USER': 'root',
        'PASSWORD': 'Password'
    }
}

# admin site user
# colleens
# ColleenPassword54