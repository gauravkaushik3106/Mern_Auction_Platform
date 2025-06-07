# SuhBidz Auction Platform

[![Node.js](https://img.shields.io/badge/node.js-v18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-4.x-lightgrey)](https://expressjs.com/)
[![React](https://img.shields.io/badge/react-18.x-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/mongodb-v6.x-brightgreen)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

🔗 **Live Demo:** [https://suhbidz-auction-platform.netlify.app/](https://suhbidz-auction-platform.netlify.app/)
📂 **Repo:** [https://github.com/gauravkaushik3106/Mern\_Auction\_Platform](https://github.com/gauravkaushik3106/Mern_Auction_Platform)

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Getting Started](#getting-started)
6. [Configuration & Environment Variables](#configuration--environment-variables)
7. [Running Locally](#running-locally)
8. [Usage Guide](#usage-guide)
9. [API Endpoints](#api-endpoints)
10. [Automation: Cron Jobs](#automation-cron-jobs)
11. [EmailJS Integration](#emailjs-integration)
12. [Security & Best Practices](#security--best-practices)
13. [Deployment](#deployment)
14. [Contributing](#contributing)
15. [License](#license)

---

## 🚀 Project Overview

SuhBidz is a **feature-rich**, full-stack auction platform enabling creators to list items for bidding and enthusiasts to place competitive bids. It employs a robust automation system to finalize auctions, notify winners, and manage seller commissions seamlessly.

---

## ✨ Key Features

* **User Authentication**: Secure signup/login with JWT stored in HTTP-only cookies.
* **Auction Management**: Create, view (upcoming, live, ended), update, and delete auctions.
* **Real-Time Bidding**: Place bids with client-side validation and live highest-bid feedback.
* **Leaderboards**: Display top bidders per auction.
* **Payment Workflow**:

  * **Email Notifications**: Automated winner notifications with payment instructions.
  * **Commission Tracking**: Sellers submit proof of payment; platform verifies and settles automatically.
* **Admin Panel**: Super-admin can manage users, auctions, and commissions.
* **Contact Form**: Frontend-driven EmailJS integration for direct user support.

---

## 🛠️ Tech Stack

| Layer            | Technology                           |
| ---------------- | ------------------------------------ |
| Frontend         | React, Vite, Tailwind CSS            |
| State Management | Redux Toolkit                        |
| Backend          | Node.js, Express                     |
| Database         | MongoDB with Mongoose                |
| File Storage     | Cloudinary                           |
| Task Scheduling  | node-cron                            |
| Emails           | Nodemailer (SMTP), EmailJS (client)  |
| Authentication   | JSON Web Tokens, HTTP-only cookies   |
| Deployment       | Netlify (frontend), Render (backend) |

---

## 📂 Folder Structure

```
backend/
├── automation/            # Cron jobs for auction & commission workflows
├── config/                # Environment configuration
├── controllers/           # Business logic
├── database/              # MongoDB connection
├── middlewares/           # Auth, error handling, guards
├── models/                # Mongoose schemas
├── router/                # API route definitions
├── utils/                 # JWT & email utilities
├── server.js              # App initialization
├── package.json
└── package-lock.json

frontend/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons
│   ├── layout/            # Shared layout components (SideDrawer)
│   ├── custom-components/ # Reusable UI components
│   ├── pages/             # Route-level pages
│   ├── store/             # Redux slices & store
│   ├── lib/               # Utility functions (API client)
│   ├── App.jsx            # Main React component & router
│   └── main.jsx           # App bootstrap
├── .gitignore
├── package.json
└── vite.config.js
```

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repo

```bash
git clone https://github.com/gauravkaushik3106/Mern_Auction_Platform.git
cd Mern_Auction_Platform
```

### 2. Install dependencies

```bash
# Backend
npm install

# Frontend
cd frontend
npm install
```

---

## ⚙️ Configuration & Environment Variables

Create a `.env` file in `backend/config/`:

```
PORT=5000
MONGODB_URI=<your MongoDB URI>
JWT_SECRET=<your_jwt_secret>
COOKIE_EXPIRE=7
FRONTEND_URL=http://localhost:3000

# Email (Nodemailer)
SMTP_HOST=<smtp_host>
SMTP_PORT=<smtp_port>
SMTP_SERVICE=<smtp_service>
SMTP_MAIL=<smtp_email>
SMTP_PASSWORD=<smtp_password>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>
```

For the frontend, in `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api/v1
VITE_EMAILJS_SERVICE_ID=<emailjs_service_id>
VITE_EMAILJS_TEMPLATE_ID=<emailjs_template_id>
VITE_EMAILJS_PUBLIC_KEY=<emailjs_public_key>
```

---

## ▶️ Running Locally

**Backend**

```bash
npm run dev   # starts server on port 5000
```

**Frontend**

```bash
cd frontend
npm run dev   # starts Vite dev server on http://localhost:3000
```

---

## 📋 Usage Guide

1. **Register/Login**: Create an account or log in.
2. **Create Auction**: Provide title, description, start/end time, bid amount, and images.
3. **Browse Auctions**: Filter by status (upcoming, live, ended).
4. **Place Bids**: Enter bid amount > current highest bid.
5. **View Leaderboard**: Check top bidders on any auction.
6. **Submit Commission Proof**: Upload payment receipt and amount.
7. **Admin Actions**: (Super-admin only) Manage all users, auctions, and proofs.

---

## 🔗 API Endpoints

| Route                 | Method | Access        | Description               |
| --------------------- | ------ | ------------- | ------------------------- |
| `/user/register`      | POST   | Public        | Register a new user       |
| `/user/login`         | POST   | Public        | Login and receive JWT     |
| `/user/logout`        | GET    | Authenticated | Logout and clear cookie   |
| `/auctionitem`        | GET    | Public        | List all auctions         |
| `/auctionitem/create` | POST   | Authenticated | Create a new auction      |
| `/auctionitem/:id`    | GET    | Public        | Get auction details by ID |
| `/bid/place`          | POST   | Authenticated | Place a bid on an auction |
| `/commission/submit`  | POST   | Authenticated | Upload commission proof   |
| `/superadmin/users`   | GET    | Super-admin   | View all users            |

---

## 🕒 Automation: Cron Jobs

* **Ended Auction Cron**:

  * Frequency: Every minute.
  * Actions: Finalizes auctions past `endTime`, computes commission, updates user stats, and sends winner emails.

* **Verify Commission Cron**:

  * Frequency: Every minute.
  * Actions: Processes approved payment proofs, deducts commissions, creates settlement records, and notifies sellers.

---

## 📧 EmailJS Integration

Used for the **Contact Us** form to send client-side emails without exposing backend routes.

1. Install: `npm install emailjs-com`
2. Configure `.env` with EmailJS IDs.
3. Call in `Contact.jsx`:

```js
emailjs.sendForm(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  e.target,
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
)
```

---

## 🔐 Security & Best Practices

* **JWT & Cookies**: HTTP-only, sameSite protection.
* **Password Hashing**: Bcrypt in Mongoose pre-save.
* **CORS**: Restricted origin to frontend URL.
* **Error Handling**: Centralized middleware to standardize responses.
* **Environment Variables**: All secrets in `.env`, not committed.

---

## ☁️ Deployment

* **Frontend**: Deploy with Netlify—link GitHub repo, build command `npm run build`.
* **Backend**: Deploy on Render or Heroku—set environment variables in dashboard, enable background worker for cron.

---

## 🤝 Contributing

1. Fork the repo.
2. Create your feature branch: `git checkout -b feature/YourFeature`.
3. Commit changes: `git commit -m 'Add some feature'`.
4. Push to branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.
