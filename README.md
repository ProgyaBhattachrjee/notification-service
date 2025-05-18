# Notification Service

This is a simple Node.js-based notification service that sends messages via **email** and **SMS** using RabbitMQ as a message broker.

## 📦 Features

| Feature           | Description                                      |
|------------------|--------------------------------------------------|
| Queue System      | RabbitMQ used to queue notifications             |
| Email Notifications | Sends emails using Nodemailer                    |
| SMS Notifications | Sends SMS via Twilio                             |
| Frontend Form     | Simple HTML form for sending notifications       |

## 🏗️ Project Structure

```
notification-service/
├── index.js                  # Entry point - Express server & publisher
├── workers/
│   └── notificationWorker.js # Worker that consumes from queue
├── services/
│   ├── emailService.js       # Email sending logic using Nodemailer
│   └── smsService.js         # SMS sending logic using Twilio
├── public/
│   └── form.html             # Frontend HTML form
├── .env                      # Environment variables (excluded from git)
├── example.env               # Sample environment config
├── .gitignore
└── README.md
```

## 🌐 Frontend Preview

Below is a preview of the notification form (`form.html`):

![Form Preview](https://i.imgur.com/YOUR_FORM_IMAGE.png)

## 🛠️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/notification-service.git
   cd notification-service
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Copy `.env` to `example.env`
   - Fill in your credentials for RabbitMQ, Twilio, and Email

4. **Run RabbitMQ (with Docker)**
   ```bash
   docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
   ```

5. **Start services**
   ```bash
   node index.js                 # Starts Express publisher
   node workers/notificationWorker.js  # Starts worker
   ```

6. **Use the frontend**
   - Open `http://localhost:3000` in your browser
   - Fill in the form and submit to send a notification

## 📧 Example `.env`

```
RABBITMQ_URL=amqp://localhost
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password_or_app_password
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1XXXXXXXXXX
```

---

Made with ❤️ using Node.js, RabbitMQ, Nodemailer, and Twilio.
