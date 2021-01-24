import jenkins
from cron_descriptor import get_description, ExpressionDescriptor

def jenkins_version():
    print('jenkins')
    print('jenkins')
    server = jenkins.Jenkins('http://ec2-18-222-146-212.us-east-2.compute.amazonaws.com:8080/', username='nick-admin-aws', password='upHCjJTCe8E7')
    jobs = server.get_jobs()
    print(jobs)
    user = server.get_whoami()
    version = server.get_version()
    debug = 'Hello %s from Jenkins %s and full json payload:\\n %s' % (user['fullName'], version, server.get_jobs())
    print(debug)

def jenkins_schedule_daemon():
    # todo replace w db data, 
    # use test data for tests
    schedules = jenkins_schedule_test_data()
    for x in schedules:
        # evaluate the schedule/current_time to see if build is green light
        x.logVars()
        # # if yes, launch a job call to jenkins to start a build
        if x.isGreenLight():
            x.asyncJenkinsBuildStart()

class Schedule:
    def logVars(self):
        print('_job_' + self.job_name)
        print('_scheduled_' + self.cron)
        print('_cron_' + get_description(self.cron))
        print('_green-light_' + "{}".format(self.isGreenLight()))

    def __init__(self, job_name, job_type):
        self.job_name = job_name
        self.job_type = job_type
        self.diff_deploy = False
        self.tar_env = ''
        self.source_branch = ''
        self.validate_only = True
        self.scan_for_destructive = False
        self.test_level = 'No Test Run'
        self.test_level_classes = ''
        self.cron = '1 2 3 * *'

    def isGreenLight(self):
        return False
    
    def asyncJenkinsBuildStart(self):
        jenkinsBuild(self)

def jenkinsBuild(build):
    server = jenkins.Jenkins('http://ec2-18-222-146-212.us-east-2.compute.amazonaws.com:8080/', username='nick-admin-aws', password='upHCjJTCe8E7')
    # https://python-jenkins.readthedocs.io/en/latest/examples.html#example-3-working-with-jenkins-jobs
    # gets list of current jobs
    jobs = server.get_jobs()
    print(jobs)
    # prints xml config of the job
    # my_job = server.get_job_config('django')
    # print(my_job) # prints XML configuration


def jenkinsJobsMethodExamples():
    print('jenkinsJobsMethodExamples')
    # server.create_job('empty', jenkins.EMPTY_CONFIG_XML)
    # jobs = server.get_jobs()
    # print(jobs)
    # my_job = server.get_job_config('cool-job')
    # print(my_job) # prints XML configuration
    # server.build_job('empty')
    # server.disable_job('empty')
    # server.copy_job('empty', 'empty_copy')
    # server.enable_job('empty_copy')
    # server.reconfig_job('empty_copy', jenkins.RECONFIG_XML)

    # server.delete_job('empty')
    # server.delete_job('empty_copy')

    # # build a parameterized job
    # # requires creating and configuring the api-test job to accept 'param1' & 'param2'
    # server.build_job('api-test', {'param1': 'test value 1', 'param2': 'test value 2'})
    # last_build_number = server.get_job_info('api-test')['lastCompletedBuild']['number']
    # build_info = server.get_build_info('api-test', last_build_number)
    # print build_info

    # # get all jobs from the specific view
    # jobs = server.get_jobs(view_name='View Name')
    # print jobs


def jenkins_schedule_test_data():
    schedules = []
    schedule = Schedule('Run Tests in QA', 'salesforce')
    schedule.tar_env = 'env_name.access_token_234323413418932842394238948239'
    schedule.source_branch = 'branch_name.access_token_45453234234234234'

    schedules.append(schedule)
    return schedules



