# Notification Service

This is a simple notification service built with Node.js that allows you to send messages via **Email** and **SMS** using RabbitMQ for message queuing. You can submit notifications through a user-friendly form interface, and they will be processed asynchronously by background workers.

## Features

- Submit notifications through a web form.
- Supports both Email and SMS notifications.
- Uses RabbitMQ to queue messages for better performance and reliability.
- Sends SMS using Twilio.
- Sends Email using Nodemailer with Gmail.

## Technologies Used

- Node.js
- Express.js
- RabbitMQ
- Twilio (for SMS)
- Nodemailer (for Email)
- Docker (for running RabbitMQ)
- HTML/CSS (for frontend form)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/notification-service.git
cd notification-service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file based on the provided `example.env`. This will store your API keys and configuration values.

```env
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
```

### 4. Start RabbitMQ

Use Docker to start RabbitMQ:

```bash
docker run -d --hostname my-rabbit --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Visit the dashboard at [http://localhost:15672](http://localhost:15672)  
Username: `guest`  
Password: `guest`

### 5. Start the Services

Start the publisher server (form interface):

```bash
node index.js
```

Start the worker to process notifications:

```bash
node workers/notificationWorker.js
```

### 6. Access the Web Form

Visit [http://localhost:3000](http://localhost:3000) and use the form to send a notification.

## Folder Structure

```
notification-service/
│
├── services/
│   ├── emailService.js
│   └── smsService.js
│
├── workers/
│   └── notificationWorker.js
│
├── public/
│   └── index.html (form UI)
│
├── .env (not committed to Git)
├── example.env
├── index.js
├── package.json
└── README.md
```
