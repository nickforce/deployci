from django.contrib import admin

from .models import Ci_deploy , Ci_envs , Ci_jobs

admin.site.register(Ci_deploy)
admin.site.register(Ci_envs)
admin.site.register(Ci_jobs)