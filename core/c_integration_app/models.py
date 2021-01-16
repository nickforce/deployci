from django.db import models




class Ci_envs(models.Model):
    name      = models.CharField(max_length=255)
    type       = models.CharField(max_length=255 , default='github')
    url_repo   = models.URLField(max_length=255 )


class Ci_deploy(models.Model):
    name  = models.CharField(max_length=255)
    type  = models.CharField(max_length=255)
    env1  = models.ForeignKey(Ci_envs , on_delete= models.CASCADE)


class Ci_jobs(models.Model):
    name    = models.CharField(max_length=255)
    type    = models.CharField(max_length=255)
    deploy  = models.ForeignKey(Ci_deploy , on_delete = models.CASCADE)