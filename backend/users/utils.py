# users/utils.py
import random
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import EmailVerification

def generate_verification_code():
    return str(random.randint(100000, 999999))

def send_verification_email(user):
    EmailVerification.objects.filter(user=user, is_used=False).delete()
    
    code = generate_verification_code()
    
    verification = EmailVerification.objects.create(
        user=user,
        code=code
    )
    
    subject = 'Verify Your Email for EasyGrades'
    greeting_name = user.get_full_name() or user.email
    message = f'''
    Hello {greeting_name},
    
    Welcome to EasyGrades! Please verify your email address by entering this code:
    
    {code}
    
    This code will expire in 10 minutes.
    
    If you didn't create an account, please ignore this email.
    
    Best regards,
    EasyGrades Team
    '''
    
    try:
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
        return True, verification
    except Exception as e:
        return False, str(e)

def send_password_reset_email(user, reset_code):
    subject = 'Reset Your Password - EasyGrades'
    greeting_name = user.get_full_name() or user.email
    message = f'''
    Hello {greeting_name},
    
    You requested to reset your password. Use this code to reset it:
    
    {reset_code}
    
    This code will expire in 15 minutes.
    
    If you didn't request this, please ignore this email.
    
    Best regards,
    EasyGrades Team
    '''
    
    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )