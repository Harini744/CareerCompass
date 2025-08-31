from django.db import models
from django.contrib.auth.models import User

class Domain(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    demand = models.CharField(max_length=50)
    salary_range = models.CharField(max_length=50)
    icon = models.TextField()  # SVG string

    def __str__(self):
        return self.name

class RoadmapStep(models.Model):
    domain = models.ForeignKey(Domain, related_name='roadmap', on_delete=models.CASCADE)
    step = models.TextField()

class ProjectIdea(models.Model):
    domain = models.ForeignKey(Domain, related_name='projects', on_delete=models.CASCADE)
    idea = models.TextField()

class LearningResource(models.Model):
    domain = models.ForeignKey(Domain, related_name='resources', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    url = models.URLField()

class QuizQuestion(models.Model):
    domain = models.ForeignKey(Domain, related_name='quiz', on_delete=models.CASCADE)
    question = models.TextField()
    option_a = models.CharField(max_length=200)
    option_b = models.CharField(max_length=200)
    option_c = models.CharField(max_length=200)
    option_d = models.CharField(max_length=200)
    correct_answer = models.CharField(max_length=1)  # A/B/C/D

class QuizScore(models.Model):
    domain = models.CharField(max_length=100)
    score = models.IntegerField()
    total = models.IntegerField(default=10)
    date_taken = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.domain} - {self.score}/{self.total}"
