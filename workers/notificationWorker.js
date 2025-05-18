const amqp = require('amqplib');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
require('dotenv').config();
const queue = 'notifications';
async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log(`Listening on queue: ${queue}`);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const notification = JSON.parse(msg.content.toString());
        console.log('Received from queue:', notification);

        try {
          if (notification.type === 'email') {
            await emailService.sendEmail(notification.email, notification.message);
          } else if (notification.type === 'sms') {
            await smsService.sendSMS(notification.phone, notification.message);
          } else {
            console.log('Unknown notification type:', notification.type);
          }
          channel.ack(msg);
        } catch (error) {
          console.error('Error processing notification:', error.message);
        }
      }
    });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error.message);
  }
}
connect();