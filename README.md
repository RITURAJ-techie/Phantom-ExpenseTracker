# 💰 Phantom Expense Tracker

A full-stack personal finance management web application built with React, Node.js, Express, and MongoDB.

> Built to demonstrate end-to-end development — from authentication and REST APIs to database management, deployment, analytics, and digital marketing integration.

---

## 📦 Project Overview

| **Application** | **Domain** | **Key Highlights** |
| ---------------- | ---------- | ------------------ |
| **Phantom Expense Tracker** | Personal Finance | Expense Tracking, Budget Management, Reports, Analytics |

---

## 💰 Phantom Expense Tracker — Personal Finance Management

Phantom is a personal finance management application that helps users track income and expenses, manage budgets, and understand their financial activity through dashboards and reports.

### **Features**

- 🔐 User registration and JWT-based authentication
- 💸 Add, edit, and delete transactions
- 💰 Track income and expenses
- 🏷️ Categorize transactions
- 📊 Dashboard with financial summaries
- 📈 Reports and data visualization
- 🎯 Budget creation and tracking
- 📱 Responsive user interface

### **Tech Stack**

`React` `Vite` `JavaScript` `Tailwind CSS` `Node.js` `Express.js` `MongoDB` `Mongoose` `JWT` `Axios` `Recharts`

---

## 📊 Analytics & Digital Marketing

The project also demonstrates how a web application can be connected with analytics and digital marketing tools.

### **Google Analytics 4**

GA4 is integrated to track important user interactions.

**Tracked Events**

- `sign_up`
- `login`
- `add_expense`
- `edit_expense`
- `delete_expense`
- `create_budget`
- `view_report`
- `download_report`

### **Google Search Console**

- Website ownership verification
- Sitemap submission
- Search visibility monitoring

### **Google Ads**

A Search campaign was configured for academic and digital marketing demonstration.

**Campaign Configuration**

- Campaign Type: Search
- Location: India
- Language: English
- Bidding: Maximize Clicks
- Daily Budget: ₹20/day
- Keywords: Expense Tracker, Budget Planner, Daily Expense Tracker, Financial Planning
- Status: Not funded / Not activated

---

## 🧰 Technology Stack

| **Layer** | **Technology** |
| --------- | -------------- |
| **Frontend** | React, Vite, JavaScript, Tailwind CSS |
| **Routing** | React Router |
| **API Communication** | Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT, bcryptjs |
| **Charts** | Recharts |
| **Analytics** | Google Analytics 4 |
| **SEO / Search** | Google Search Console |
| **Marketing** | Google Ads |
| **Frontend Deployment** | Vercel |
| **Backend Deployment** | Render |
| **Database Hosting** | MongoDB Atlas |
| **Version Control** | Git, GitHub |

---

## 🏗️ Architecture

```text
                    USER
                      │
                      ▼
              ┌───────────────┐
              │ React + Vite  │
              │   Frontend    │
              └───────┬───────┘
                      │
                    Axios
                      │
                      ▼
              ┌───────────────┐
              │ Node + Express│
              │   REST API    │
              └───────┬───────┘
                      │
                  Mongoose
                      │
                      ▼
              ┌───────────────┐
              │ MongoDB Atlas │
              └───────────────┘

## Repository Structure

Phantom-ExpenseTracker/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── public/
│
├── server/                 # Node.js / Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── config/
│
├── README.md
└── .gitignore

🔑 What This Demonstrates
✅ Full-stack development — Built both frontend and backend components
✅ RESTful API development — Designed APIs for authentication, transactions, budgets, and reports
✅ Database management — MongoDB schema design and CRUD operations using Mongoose
✅ Authentication & security — JWT authentication and password hashing
✅ Data visualization — Financial data represented through interactive charts
✅ Cloud deployment — Frontend, backend, and database deployed using cloud platforms
✅ Analytics integration — GA4 custom event tracking
✅ Digital marketing — Google Ads campaign configuration and Search Console integration


🌐 Live Demo
https://phantom-expense-tracker.vercel.app/

👤 Author

RITURAJ
🌐 Live Application
💻 GitHub Repository
