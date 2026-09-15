# 💰 Phantom Expense Tracker

A full-stack personal finance management web application that helps users track income and expenses, manage budgets, and understand their financial activity through an interactive dashboard and reports.

🌐 **Live Application:** https://phantom-expense-tracker.vercel.app/

💻 **GitHub Repository:** https://github.com/RITURAJ-techie/Phantom-ExpenseTracker/tree/main

---

## 📖 Description

### What is Phantom?

**Phantom Expense Tracker** is a full-stack personal finance management application designed to make everyday financial tracking simple and organized.

The application allows users to securely create an account, manage their income and expenses, create budgets, and analyze their financial activity through dashboards and reports.

The project was built using **React.js, Node.js, Express.js, and MongoDB**, with JWT-based authentication and REST APIs connecting the frontend and backend.

In addition to the core application, Phantom integrates **Google Analytics 4, Google Search Console, and Google Ads** to demonstrate how a modern web application can be developed, deployed, monitored, and promoted.

---

## 🎯 Motivation

Managing daily expenses manually can make it difficult to understand spending patterns and stay within a planned budget.

The motivation behind Phantom was to create a simple platform where users can keep their financial information organized in one place instead of relying on spreadsheets, notes, or multiple tools.

I also wanted to build a project that went beyond basic CRUD functionality and provided practical experience with the complete lifecycle of a real-world web application.

---

## 💡 Problem It Solves

Personal financial information can become difficult to manage when income, expenses, and budgets are tracked separately.

Phantom provides a centralized solution that allows users to:

- Record income and expenses
- Categorize transactions
- Edit and delete transactions
- Create and monitor budgets
- View financial summaries
- Analyze spending through reports and charts

This makes it easier for users to understand their financial activity and maintain better control over their spending.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- Protected routes
- Authentication middleware

### 💸 Expense & Income Management

- Add transactions
- Edit transactions
- Delete transactions
- Track income
- Track expenses
- Categorize transactions

### 💰 Budget Management

- Create budgets
- Track budget limits
- Monitor spending
- Manage budget information

### 📊 Dashboard

- Total income
- Total expenses
- Current balance
- Recent transactions
- Budget overview
- Financial summaries

### 📈 Reports & Data Visualization

- Financial reports
- Spending analysis
- Interactive charts
- Financial data visualization
- Graphical representation of financial activity

### 📱 Responsive Interface

The application provides a responsive interface designed for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend

- **React.js** — Building the user interface
- **Vite** — Development and build tooling
- **JavaScript** — Application logic
- **Tailwind CSS** — Styling and responsive design
- **React Router** — Client-side routing
- **Axios** — API communication
- **Recharts** — Data visualization
- **Lucide React** — Icons

### Backend

- **Node.js** — Backend runtime
- **Express.js** — REST API framework
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **dotenv** — Environment configuration
- **CORS** — Cross-origin communication

### Database

- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **MongoDB Atlas** — Cloud database hosting

### Analytics & Digital Marketing

- **Google Analytics 4**
- **Google Search Console**
- **Google Ads**

### Deployment

- **Vercel** — Frontend
- **Render** — Backend
- **MongoDB Atlas** — Database

### Version Control

- **Git**
- **GitHub**

---

## 🏗️ Architecture

```text
                         USER
                          │
                          ▼
                 ┌─────────────────┐
                 │  React + Vite   │
                 │    Frontend     │
                 └────────┬────────┘
                          │
                        Axios
                          │
                          ▼
                 ┌─────────────────┐
                 │ Node.js +       │
                 │ Express.js      │
                 │    Backend      │
                 └────────┬────────┘
                          │
                       Mongoose
                          │
                          ▼
                 ┌─────────────────┐
                 │  MongoDB Atlas  │
                 └─────────────────┘


              Analytics & Marketing
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
         GA4      Search Console  Google Ads


---

## 🔄 Application Flow

```text
User
 │
 ▼
Register / Login
 │
 ▼
JWT Authentication
 │
 ▼
Dashboard
 │
 ├── Transactions
 │     ├── Add Expense
 │     ├── Edit Expense
 │     └── Delete Expense
 │
 ├── Budgets
 │
 └── Reports
       │
       ▼
   Financial Analysis



---

## 📊 Analytics & Tracking

Phantom integrates **Google Analytics 4 (GA4)** to understand how users interact with the application.

### GA4 Custom Events

The following user actions are tracked:

- `sign_up` — User registration
- `login` — User login
- `add_expense` — Adding an expense
- `edit_expense` — Editing an expense
- `delete_expense` — Deleting an expense
- `create_budget` — Creating a budget
- `view_report` — Viewing financial reports
- `download_report` — Downloading reports

These events help analyze user engagement and the usage of important application features.

---

## 📢 Google Ads Campaign

A **Google Ads Search Campaign** was configured as part of the digital marketing implementation.

### Campaign Configuration

| Setting | Value |
|---|---|
| Campaign Type | Search |
| Campaign Name | ExpenseTracker Pro Search Campaign |
| Target Location | India |
| Language | English |
| Daily Budget | ₹20/day |
| Bidding Strategy | Maximize Clicks |
| Network | Google Search Network |
| Status | Not Funded / Not Activated |

### Target Keywords

- Expense Tracker
- Budget Planner
- Daily Expense Tracker
- Financial Planning

The campaign was configured for **academic and demonstration purposes**. It was not funded or activated for paid advertising.

---

## 🔎 Google Search Console

Google Search Console was integrated to demonstrate search visibility and website indexing.

### Configuration

- Website ownership verified using Google Analytics
- Sitemap submitted successfully
- Sitemap: `sitemap.xml`
- Public pages included:
  - Home
  - Login
  - Register

---

## ☁️ Deployment

The application uses separate services for frontend, backend, and database hosting.

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

### Live Application

🌐 https://phantom-expense-tracker.vercel.app/

---

## ⚙️ Local Setup

### Prerequisites

- Node.js
- npm
- MongoDB / MongoDB Atlas
- Git

### Clone Repository

```bash
git clone https://github.com/RITURAJ-techie/Phantom-ExpenseTracker.git
cd Phantom-ExpenseTracker

cd Phantom-ExpenseTracker

Then continue:

### Install Frontend Dependencies

```bash
cd client
npm install
Install Backend Dependencies

Open another terminal:

cd server
npm install
Environment Variables

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Create a .env file inside the client folder:

VITE_API_URL=http://localhost:5000/api
Run Backend
cd server
npm run dev
Run Frontend
cd client
npm run dev
