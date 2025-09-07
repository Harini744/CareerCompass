import json
import jwt, datetime
from urllib.parse import unquote
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from .gemini_api_client import generate_it_resources, generate_quiz_from_gemini
from .models import QuizScore
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import get_user_model, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from google.oauth2 import id_token
from google.auth.transport import requests

# ------------------- Resource API -------------------
@csrf_exempt
@require_GET
def get_domain_resources(request, domain):
    try:
        domain_clean = unquote(domain)
        data = generate_it_resources(domain_clean)
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ------------------- Quiz API -------------------
@csrf_exempt
@require_POST
def generate_quiz(request):
    try:
        body = json.loads(request.body)
        domain = body.get("domain", "")
        if not domain:
            return JsonResponse({"error": "Domain is required"}, status=400)

        quiz_data = generate_quiz_from_gemini(domain)
        return JsonResponse({"quiz": quiz_data}, safe=False)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# -----------------Quiz result --------------------
@csrf_exempt
@require_POST
def submit_quiz(request):
    """
    Handles quiz score submission without requiring a logged-in user.
    """
    # The login check has been commented out for now.
    # if not request.user.is_authenticated:
    #     return JsonResponse({'error': 'Authentication required to save score'}, status=401)

    try:
        data = json.loads(request.body)

        domain = data.get('domain')
        score = data.get('score')
        total = data.get('total', 10)

        if not domain or score is None:
            return JsonResponse({'error': 'Missing required fields: domain or score'}, status=400)

        # The user field is commented out. If your model's 'user' field
        # is a ForeignKey, it will need to be made optional (e.g., null=True)
        # to work with this code.
        QuizScore.objects.create(
            # user=request.user,
            domain=domain,
            score=score,
            total=total
        )

        return JsonResponse({'message': 'Score saved successfully'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON format in request body'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@require_GET
@csrf_exempt
def get_all_scores(request):
    """
    Retrieve all scores from the database. The endpoint is publicly accessible.
    """
    scores = QuizScore.objects.all().order_by('-date_taken')
    data = [
        {
            # user ID field is also commented out to avoid errors.
            # "user_id": s.user.id if s.user else None,
            "domain": s.domain,
            "score": s.score,
            "total": s.total,
            "date_taken": s.date_taken.strftime('%Y-%m-%d %H:%M')
        } for s in scores
    ]
    return JsonResponse(data, safe=False)
# ----------------- Google OAuth2 Login --------------------
GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"  # 👈 Replace with yours

class GoogleLoginView(APIView):
    def post(self, request):
        try:
            token = request.data.get('token')
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
            email = idinfo['email']
            name = idinfo['name']
            User = get_user_model()
            user, created = User.objects.get_or_create(email=email)
            if created:
                user.username = email
                user.first_name = name
                user.set_unusable_password()
                user.save()
            login(request, user)
            return Response({"message": "Login successful.", "user": {
                "email": user.email,
                "name": user.first_name or user.username
            }}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class SendMagicLinkView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required"}, status=400)

        User = get_user_model()
        user, created = User.objects.get_or_create(email=email)
        if created:
            user.username = email
            user.set_unusable_password()
            user.save()

        payload = {
            "email": user.email,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=15)
        }
        token = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")
        magic_link = f"http://localhost:3000/verify?token={token}"

        try:
            send_mail(
                subject="Your Login Link",
                message=f"Click to login: {magic_link}",
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[email],
                fail_silently=False
            )
            return Response({"message": "Magic link sent."})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

class VerifyMagicLinkView(APIView):
    def get(self, request):
        token = request.query_params.get('token')
        if not token:
            return Response({"error": "Token is required."}, status=400)

        try:
            payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
            email = payload['email']
            User = get_user_model()
            user = User.objects.get(email=email)
            login(request, user)
            return Response({"message": "Login successful.", "user": {
                "email": user.email,
                "name": user.first_name or user.username
            }})
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token expired."}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=400)
