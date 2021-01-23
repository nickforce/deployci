from asgiref.sync import sync_to_async
# import jenkins

# def _get_blog(pk):
#     return Blog.objects.select_related('author').get(pk=pk)



# def create_jenkins_version():
#     server = jenkins.Jenkins('http://ec2-18-222-146-212.us-east-2.compute.amazonaws.com:8080/', username='nick-admin-aws', password='upHCjJTCe8E7')
#     jobs = server.get_jobs()
#     print(jobs)
#     user = server.get_whoami()
#     version = server.get_version()
#     debug = 'Hello %s from Jenkins %s and full json payload:\\n %s' % (user['fullName'], version, server.get_jobs())
#     print(debug)
#     return JsonResponse({'jenkins': debug})

# async def checkJenkinsRest():
#     print('checkJenkinsRest async')
#     test = await sync_to_async(_get_stuff, thread_sensitive=True)
#     print(test.jenkins)
