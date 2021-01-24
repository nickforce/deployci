from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from sch_batch import jenkins_api_batch

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(jenkins_api_batch.jenkins_schedule_daemon, 'interval', minutes=.5)
    scheduler.start()