import json
from urllib.parse import unquote
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST
from .gemini_api_client import generate_it_resources, generate_quiz_from_gemini
from .models import QuizScore

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
