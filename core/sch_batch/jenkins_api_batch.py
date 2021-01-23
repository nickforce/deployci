import jenkins

def jenkins_version(request):
    print('jenkins')
    print('jenkins')
    server = jenkins.Jenkins('http://ec2-18-222-146-212.us-east-2.compute.amazonaws.com:8080/', username='nick-admin-aws', password='upHCjJTCe8E7')
    jobs = server.get_jobs()
    print(jobs)
    user = server.get_whoami()
    version = server.get_version()
    debug = 'Hello %s from Jenkins %s and full json payload:\\n %s' % (user['fullName'], version, server.get_jobs())
    print(debug)