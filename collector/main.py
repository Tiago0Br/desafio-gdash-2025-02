import requests
from dotenv import load_dotenv
import os
import pika
import json

load_dotenv()

RABBITMQ_HOST = os.getenv('RABBITMQ_HOST', 'localhost')
RABBITMQ_PORT = int(os.getenv('RABBITMQ_PORT_EXTERNAL', 5672))
RABBITMQ_USER = os.getenv('RABBITMQ_USER', 'guest')
RABBITMQ_PASS = os.getenv('RABBITMQ_PASS', 'guest')
QUEUE_NAME = 'weather_data'

LAT = os.getenv('CITY_LAT', '-23.55')
LON = os.getenv('CITY_LON', '-46.63')
OPENMETEO_URL = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current=temperature_2m,relative_humidity_2m,weather_code"

def get_weather_data():
  """Busca dados da API Open-Meteo"""
  try:
    response = requests.get(OPENMETEO_URL)
    response.raise_for_status()
    data = response.json()

    current = data.get('current', {})
    payload = {
        "city": "São Paulo", 
        "temperature": current.get('temperature_2m'),
        "humidity": current.get('relative_humidity_2m'),
        "description": str(current.get('weather_code')),
        "collectedAt": current.get('time') 
    }
    return payload
  except Exception as e:
    print(f"Erro ao buscar clima: {e}")
    return None

def publish_to_queue(payload):
  """Conecta no RabbitMQ e envia a mensagem"""
  try:
    credentials = pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASS)
    
    connection = pika.BlockingConnection(
      pika.ConnectionParameters(host=RABBITMQ_HOST, port=RABBITMQ_PORT, credentials=credentials)
    )
    channel = connection.channel()

    channel.queue_declare(queue=QUEUE_NAME, durable=True)

    message_body = json.dumps(payload)
    channel.basic_publish(
      exchange='',
      routing_key=QUEUE_NAME,
      body=message_body,
      properties=pika.BasicProperties(
        delivery_mode=2,
      )
    )
    
    print(f" [x] Enviado: {message_body}")
    connection.close()
  except Exception as e:
    print(f"Erro ao conectar no RabbitMQ: {e}")

def main():
  print("Iniciando coletor de clima...")
  weather_data = get_weather_data()

  if weather_data:
    publish_to_queue(weather_data)

if __name__ == "__main__":
  main()
