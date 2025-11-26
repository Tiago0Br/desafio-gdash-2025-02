import logging
import config
from services.weather_service import get_weather_data
from services.rabbitmq_service import RabbitMQPublisher

logging.basicConfig(
  level=logging.INFO,
  format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
  logger.info("Starting weather collector...")

  weather_data = get_weather_data(config.OPENMETEO_URL, config.REGION_NAME)

  if weather_data:
    try:
      with RabbitMQPublisher(
        host=config.RABBITMQ_HOST,
        port=config.RABBITMQ_PORT,
        user=config.RABBITMQ_USER,
        password=config.RABBITMQ_PASS,
        queue_name=config.QUEUE_NAME
      ) as publisher:
        publisher.publish(weather_data)
    except Exception as e:
      logger.error(f"Failed to publish data: {e}")

if __name__ == "__main__":
  main()
