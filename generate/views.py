from django.shortcuts import render
from django.http import HttpResponseRedirect
from . import generate

def index(request):
    query = request.GET['search']

    data = generate.randomize(query)

    return render(request,"page/index.html",data)
