from celery import Celery

def make_celery(app):
    worker = Celery(app.import_name)
    worker.config_from_object("config.celeryconfig")
    worker.conf.update(app.config)

    class ContextTask(worker.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    worker.Task = ContextTask
    return worker