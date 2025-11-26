import pika
import json
import logging
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class RabbitMQPublisher:
  def __init__(self, host: str, port: int, user: str, password: str, queue_name: str):
    self.host = host
    self.port = port
    self.user = user
    self.password = password
    self.queue_name = queue_name
    self.connection: Optional[pika.BlockingConnection] = None
    self.channel: Optional[pika.adapters.blocking_connection.BlockingChannel] = None

  def __enter__(self):
    self.connect()
    return self

  def __exit__(self, exc_type, exc_val, exc_tb):
    self.close()

  def connect(self):
    try:
      credentials = pika.PlainCredentials(self.user, self.password)
      self.connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=self.host, port=self.port, credentials=credentials)
      )
      self.channel = self.connection.channel()
      self.channel.queue_declare(queue=self.queue_name, durable=True)
      logger.info(f"Connected to RabbitMQ at {self.host}:{self.port}")
    except Exception as e:
      logger.error(f"Error connecting to RabbitMQ: {e}")
      raise

  def publish(self, payload: Dict[str, Any]):
    if not self.channel:
      raise ConnectionError("Not connected to RabbitMQ")
    
    try:
      message_body = json.dumps(payload)
      self.channel.basic_publish(
        exchange='',
        routing_key=self.queue_name,
        body=message_body,
        properties=pika.BasicProperties(
          delivery_mode=2,
        )
      )
      logger.info(f"Sent message: {message_body}")
    except Exception as e:
      logger.error(f"Error publishing message: {e}")
      raise

  def close(self):
    if self.connection and not self.connection.is_closed:
      self.connection.close()
      logger.info("Closed RabbitMQ connection")
