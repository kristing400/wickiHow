from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader



def index(request):
    if request.GET:
        title = request.GET['title']
        template = loader.get_template("pre_generated/"+title+".htm")
    else:
        template = loader.get_template("index.html")

    return HttpResponse(template.render())
