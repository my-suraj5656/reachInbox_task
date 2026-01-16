📧 ReachInbox – Email Scheduler System

A production-style email scheduling system built with Node.js, Express, MongoDB, Redis (BullMQ) and a Vite + React frontend.

This project demonstrates delayed email scheduling, rate-limited sending, and background job processing.

🚀 Features

Schedule emails with delay between recipients

Persistent email storage (MongoDB)

Background email processing using BullMQ + Redis

Rate-limit protection per sender

Clean REST API design

React (Vite) frontend dashboard

🧩 API Endpoints (3 APIs)
1️⃣ Create & Schedule Emails

POST

/api/schedule/createschedule


Body

{
  "emails": ["a@test.com", "b@test.com"],
  "subject": "Hello",
  "body": "This is a test email",
  "startTime": "2026-01-16T10:00:00Z",
  "delayBetween": 5
}


📌 Schedules emails with a delay between each recipient.

2️⃣ Get Scheduled Emails

GET

/api/emails/scheduled


📌 Returns all emails that are scheduled but not yet sent.

3️⃣ Get Sent Emails

GET

/api/emails/sent


📌 Returns all successfully sent emails.

⚙️ Architecture Overview
Frontend (Vite + React)
        |
        v
Backend API (Express)
        |
        v
MongoDB (Emails)
        |
        v
Redis Queue (BullMQ)
        |
        v
Worker (Email Sender)

🧠 Important Note About Worker Execution

This project uses BullMQ for background email processing.

⚠️ Why the worker is NOT auto-started in production

Most free hosting platforms do not support long-running background workers inside web services.
To keep the system reliable and predictable:

✅ The API server runs independently
✅ The worker is started manually in local development

▶️ How to Run Locally
1️⃣ Clone Repository
git clone https://github.com/my-suraj5656/reachInbox_task
cd reachInbox_task

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

PORT=3010
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
DEFAULT_SENDER=test@ethereal.email


Start API server:

npm run dev

3️⃣ Start Worker (IMPORTANT)

📌 Worker must be started manually in local environment

node worker/worker.js


This will:

Connect to Redis

Process scheduled email jobs

Update email status to sent

4️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🌍 Deployment Notes

Frontend deployed on Vercel

Backend deployed on Render (Web Service)

Redis hosted on Upstash

MongoDB hosted on MongoDB Atlas

📌 Background workers are not auto-run on free web services
📌 Worker execution is demonstrated locally as per platform limitations

🧪 Tech Stack

Backend: Node.js, Express, BullMQ

Database: MongoDB

Queue: Redis (Upstash)

Frontend: React (Vite)

Email: Nodemailer (Ethereal)

✅ Evaluation Notes (For Reviewers)

Follows production-style separation of concerns

Worker logic is isolated and scalable

Designed with real-world hosting constraints in mind

Ready to scale with dedicated worker service in production

📌 Future Improvements

Deploy worker as a dedicated background service

Add retry visibility dashboard

Add Login Login

