from django.urls import path
from . import views
from .views import GoogleLoginView, SendMagicLinkView, VerifyMagicLinkView

urlpatterns = [
    path("resources/<str:domain>/", views.get_domain_resources, name="get_domain_resources"),
    path("generate-quiz/", views.generate_quiz, name="generate_quiz"),
    path('submit-quiz/', views.submit_quiz, name='submit_quiz'),
    path('scores/', views.get_all_scores, name='get_all_scores'),
     path('auth/google/', GoogleLoginView.as_view(), name='google-login'),
    path('auth/email/send/', SendMagicLinkView.as_view(), name='send-magic-link'),
    path('auth/email/verify/', VerifyMagicLinkView.as_view(), name='verify-magic-link'),
]
