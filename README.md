📬 Notification Service with RabbitMQ, Twilio & Nodemailer
This is a simple Node.js application that sends notifications via Email and SMS using RabbitMQ as the message queue. It's ideal for decoupling message delivery from your main application logic.
You can submit notifications using a web form — no Postman needed!
🔧 Features
✅ Queue-based notification handling with RabbitMQ
📩 Send emails via Gmail and SMS using Twilio
🌐 User-friendly frontend form
🔐 Environment-based configuration (with .env support)
🚫 Keeps your credentials safe by ignoring .env in Git

🛠️ Technologies Used
Node.js
Express.js
RabbitMQ
Twilio (for SMS)
Nodemailer (for Email)
HTML + CSS (Frontend form)

🚀 Getting Started

1. Clone the repo
   git clone https://github.com/your-username/notification-service.git
   cd notification-service
2. Install dependencies
   npm install
3. Set up environment variables
   Create a .env file in the root folder and add the following:

.env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
🔐 Don’t worry — this file is ignored by Git. See example.env for a sample. 4. Start RabbitMQ (via Docker)
docker run -d --hostname rabbit-host --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
Then visit http://localhost:15672 (login: guest / guest)

5. Run the services
   Start the publisher (server):
   node index.js
   Start the worker (background processor):
   node workers/notificationWorker.js
   📄 Usage
   Open your browser and go to http://localhost:3000

Fill out the form and click “Send Notification”

Messages are queued in RabbitMQ and sent via email/SMS in the background

📁 Folder Structure
.
├── public/ # HTML & CSS frontend
│ └── index.html
├── services/ # Email and SMS logic
│ ├── emailService.js
│ └── smsService.js
├── workers/ # Notification consumer
│ └── notificationWorker.js
├── .env # Your sensitive keys (ignored)
├── example.env # Sample env file
├── .gitignore
├── index.js # Main server (publisher)
└── package.json
🙌 Acknowledgments
#Twilio

#Nodemailer

#RabbitMQ

#Node.js
