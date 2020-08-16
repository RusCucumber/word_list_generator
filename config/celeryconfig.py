import os

#broker_url = "redis://localhost:6379"
#result_backend = "redis://localhost:6379"

broker_url = os.getenv("REDIS_URL")
result_backed = os.getenv("REDIS_URL")

include = ["my_tasks"]