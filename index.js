const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
const path = require('path');
let channel, connection;
const queue = 'notifications';
async function connectRabbitMQ() {
  connection = await amqp.connect('amqp://localhost');
  channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: true });
  console.log(`Connected to RabbitMQ, using queue "${queue}"`);
}
connectRabbitMQ();
app.post('/notifications', async (req, res) => {
  const notification = req.body;
  if (!notification.userId || !notification.type || !notification.message) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  try {
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)), { persistent: true });
    return res.status(200).json({ success: true, message: 'Notification queued' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Publisher server running on http://localhost:${PORT}`);
});