require('dotenv').config();
const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const queueName = 'notifications';
async function startWorker() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: true });
  console.log(`👂 Listening for messages on queue "${queueName}"`);
  channel.consume(queueName, async (msg) => {
    if (msg !== null) {
      const notification = JSON.parse(msg.content.toString());
      console.log('📥 Received notification:', notification);

      try {
        if (notification.type === 'email') {
          await sendEmail(notification.email, notification.message);
        } else if (notification.type === 'sms') {
          await sendSMS(notification.phone, notification.message);
        }

        channel.ack(msg); 
      } catch (error) {
        console.error('Error processing notification:', error.message);
      }
    }
  });
}
async function sendEmail(to, message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,      
      pass: process.env.EMAIL_PASS, 
    },
  });

  await transporter.sendMail({
    from: `"Notifier" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Notification',
    text: message,
  });

  console.log(`✅ Email sent to ${to}`);
}
async function sendSMS(to, message) {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to,
  });

  console.log(`✅ SMS sent to ${to}`);
}
startWorker();