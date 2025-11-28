import os
from dotenv import load_dotenv

load_dotenv()

RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
RABBITMQ_PORT = int(os.getenv('RABBITMQ_PORT', 5672))
RABBITMQ_USER = os.getenv('RABBITMQ_USER', 'guest')
RABBITMQ_PASS = os.getenv('RABBITMQ_PASS', 'guest')
QUEUE_NAME = os.getenv('RABBITMQ_QUEUE', 'weather_data')

LAT = os.getenv('REGION_LAT')
LON = os.getenv('REGION_LON')
REGION_NAME = os.getenv('REGION_NAME')

assert LAT is not None, "REGION_LAT is not defined"
assert LON is not None, "REGION_LON is not defined"
assert REGION_NAME is not None, "REGION_NAME is not defined"

OPENMETEO_URL = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m"
