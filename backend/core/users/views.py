from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Grade, Quarter_grade, Quarter, Schedule, Class, School, User, Login_request
from .serializer import (
    GradeSerializer,
    QuarterGradeSerializer,
    QuarterSerializer,
    ScheduleSerializer,
    ClassSerializer,
    SchoolSerializer,
    UserSerializer,
    LoginRequestSerializer,
)


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def school_function(request):
    if request.method == 'GET':
        schools = School.objects.all()
        serializer = SchoolSerializer(schools, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = SchoolSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    school_id = request.data.get('id') or request.data.get('school_id')
    if not school_id:
        return Response({'error': 'School ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    school = get_object_or_404(School, id=school_id)

    if request.method == 'PATCH':
        action = request.data.get('action')

        if action == 'add':
            quarter_data = request.data.get('quarter') or request.data
            quarter_serializer = QuarterSerializer(data=quarter_data)
            if quarter_serializer.is_valid():
                quarter_serializer.save()
                return Response(quarter_serializer.data, status=status.HTTP_201_CREATED)
            return Response(quarter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if action == 'update':
            quarter_id = request.data.get('quarter_id')
            quarter = get_object_or_404(Quarter, id=quarter_id)
            quarter_serializer = QuarterSerializer(quarter, data=request.data.get('quarter') or request.data, partial=True)
            if quarter_serializer.is_valid():
                quarter_serializer.save()
                return Response(quarter_serializer.data)
            return Response(quarter_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = SchoolSerializer(school, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        school.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET', 'POST', 'PATCH'])
def class_function(request):
    if request.method == 'GET':
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    class_id = request.data.get('id') or request.data.get('class_id')
    if not class_id:
        return Response({'error': 'Class ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    class_instance = get_object_or_404(Class, id=class_id)

    if request.method == 'PATCH':
        action = request.data.get('action')

        if action == 'add':
            subjects = class_instance.subjects or []
            new_subject = request.data.get('subject') or request.data.get('name')
            if not new_subject:
                return Response({'error': 'Subject name is required'}, status=status.HTTP_400_BAD_REQUEST)

            subjects.append(new_subject)
            class_instance.subjects = subjects
            class_instance.save(update_fields=['subjects'])
            return Response({'subjects': class_instance.subjects})

        if action == 'update':
            subject_index = request.data.get('subject_index')
            if subject_index is None:
                return Response({'error': 'subject_index is required'}, status=status.HTTP_400_BAD_REQUEST)

            subjects = class_instance.subjects or []
            if not isinstance(subjects, list):
                return Response({'error': 'subjects must be a list'}, status=status.HTTP_400_BAD_REQUEST)

            if subject_index < 0 or subject_index >= len(subjects):
                return Response({'error': 'Subject index out of range'}, status=status.HTTP_400_BAD_REQUEST)

            subjects[subject_index] = request.data.get('subject') or request.data.get('name')
            class_instance.subjects = subjects
            class_instance.save(update_fields=['subjects'])
            return Response({'subjects': class_instance.subjects})

        serializer = ClassSerializer(class_instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET', 'POST', 'DELETE'])
def user_function(request):
    if request.method == 'GET':
        user_id = request.query_params.get('user_id') or request.data.get('user_id')
        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, id=user_id)
        grades = user.grades or []
        if not grades:
            return Response({'average_grade': 0})

        average = round(sum(grades) / len(grades), 2)
        return Response({'average_grade': average})
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        user_id = request.data.get('id') or request.data.get('user_id')
        if not user_id:
            return Response({'error': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        user = get_object_or_404(User, id=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def login_view(request):
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Login request accepted'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_view(request):
    return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
