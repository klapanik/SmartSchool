import random
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import EmailVerification, VerificationCode

def generate_verification_code():
    return str(random.randint(100000, 999999))

def send_verification_email(user, email_to=None):
    """Send verification email to user. If email_to is provided, use that instead of user.email"""
    if email_to is None:
        email_to = user.email
    
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
            [email_to],
            fail_silently=False,
        )
        return True, verification
    except Exception as e:
        return False, str(e)

def send_verification_sms(phone_number, code):
    """
    Отправка SMS с кодом.
    ПОКА НЕ РЕАЛИЗОВАНО - заглушка
    """
    # Для SMS нужно использовать сторонние сервисы:
    # - Twilio
    # - Vonage (бывший Nexmo)
    # - SMS.ru
    # - и т.д.
    
    print(f"📱 SMS на {phone_number}: Ваш код подтверждения: {code}")
    # Вернуть True, если отправлено успешно
    return True

def create_verification_code(user, code_type, value):
    """Создание и отправка кода подтверждения"""
    # Удаляем старые неиспользованные коды
    VerificationCode.objects.filter(
        user=user, 
        type=code_type, 
        is_used=False
    ).delete()
    
    # Генерируем новый код
    code = generate_verification_code()
    
    # Сохраняем в БД
    verification = VerificationCode.objects.create(
        user=user,
        code=code,
        type=code_type,
        value=value
    )
    
    # Отправляем код
    if code_type == 'email':
        send_verification_email(user, email_to=value)
    elif code_type == 'phone':
        send_verification_sms(value, code)
    
    return verification