from django.urls import path
from . import views

urlpatterns = [
    path("resources/<str:domain>/", views.get_domain_resources, name="get_domain_resources"),
    path("generate-quiz/", views.generate_quiz, name="generate_quiz"),
    path('submit-quiz/', views.submit_quiz, name='submit_quiz'),
    path('scores/', views.get_all_scores, name='get_all_scores'),
]
