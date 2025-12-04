import os
from dotenv import load_dotenv

load_dotenv()

COLLECTION_INTERVAL = int(os.getenv('COLLECTION_INTERVAL', 3600)) # 1 hour
RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
RABBITMQ_PORT = int(os.getenv('RABBITMQ_PORT', 5672))
RABBITMQ_USER = os.getenv('RABBITMQ_USER', 'guest')
RABBITMQ_PASS = os.getenv('RABBITMQ_PASS', 'guest')
QUEUE_NAME = os.getenv('RABBITMQ_QUEUE', 'weather_data')

LAT = os.getenv('REGION_LAT')
LON = os.getenv('REGION_LON')

assert LAT is not None, "REGION_LAT is not defined"
assert LON is not None, "REGION_LON is not defined"

OPENMETEO_URL = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
