from django.apps import AppConfig


class CIntegrationAppConfig(AppConfig):
    name = 'c_integration_app'

    def ready(self):
        from sch_batch import jenkins_api_batch_sch
        jenkins_api_batch_sch.start()