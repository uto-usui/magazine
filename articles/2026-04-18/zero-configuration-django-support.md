---
title: "Zero-configuration Django support"
source: "https://vercel.com/changelog/zero-configuration-django-support"
publishedDate: "2026-04-09"
category: "frontend"
feedName: "Vercel"
author: "Michael J. Sullivan"
---

1 min read

Apr 9, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3e2JFwro5V3WuQddGxlfeA%2F5934a67ae44ec05fa73b14505a555f3c%2FVercel_Django_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F40ebnMJ8rvYYCUHJ21I8vs%2F16c507c06355068c0f95fdb643fff2d4%2FVercel_Django_Dark.png&w=1920&q=75)

[Django](https://www.djangoproject.com/), one of the most popular high-level [Python](https://vercel.com/docs/functions/runtimes/python) web frameworks, for rapid development, is now supported with zero-configuration. You can now instantly deploy Django full-stack apps or APIs on Vercel.

Vercel now recognizes and deeply understands the specifications of Django applications, removing the need for redirects in `vercel.json` or using the `/api` folder.

All applications on Vercel use [Fluid compute](https://vercel.com/fluid) with [Active CPU pricing](https://vercel.com/blog/introducing-active-cpu-pricing-for-fluid-compute) by default. Static files will be served by the [Vercel CDN](https://vercel.com/cdn).

Deploy [Django on Vercel](https://vercel.com/templates/python/django-notes) or visit the Django on Vercel [documentation](https://vercel.com/docs/frameworks/backend/django)

### [Link to heading](#example-django-app)Example Django app

CLI entry point

manage.py

```
import osimport sysos.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")from django.core.management import execute_from_command_lineexecute_from_command_line(sys.argv)
```

Project settings

app/settings.py

```
SECRET_KEY = "my-secret-key"DEBUG = FalseALLOWED_HOSTS = ["localhost", "127.0.0.1", ".vercel.app"]ROOT_URLCONF = "app.urls"WSGI_APPLICATION = "app.wsgi.application"INSTALLED_APPS = ["app"]
```

URL routing table

app/urls.py

```
from django.urls import pathfrom app.views import indexurlpatterns = [    path("", index),]
```

Request handlers

app/views.py

```
from django.http import HttpResponsedef index(request):    return HttpResponse("<html><body>hello, world!</body></html>")
```

WSGI entry point

app/wsgi.py

```
import osfrom django.core.wsgi import get_wsgi_applicationos.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")application = get_wsgi_application()
```