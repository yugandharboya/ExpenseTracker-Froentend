# 💰 Expense Tracker (Full Stack)

A production-focused full-stack Expense Tracker application built to manage personal finances efficiently. This project demonstrates real-world skills like authentication, scalable backend design, filtering, and clean UI/UX.

---

## Live Demo

- Frontend: https://expense-tracker-froentend.vercel.app/login
- Backend API: https://expensetracker-backend-lvzi.onrender.com

---

## Core Features

- JWT-based authentication (cookie-based) with protected APIs
- Dashboard with total and category-wise expense insights
- Add, Update, and Delete transactions
- Backend-driven filtering (search, category, month/year → startDate & endDate)
- Pagination with "Load More" using `hasMore` for efficient data handling
- Dynamic month & year filtering system (no frontend filtering)
- Domain-based loading & error handling for better UX
- Auth failure handling (auto logout on 401/403)
- Responsive UI
- Scalable state management using Context API
  1. DashboardContext → handles dashboard data
  2. TransactionsContext → manages transactions CRUD operations
  3. FilterContext → controls date, category, and search filters
  4. UIContext → manages UI states (loading, modals, etc.)

---

## 🚀 Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on Railway (MySQL)

## 🛠️ Tech Stack

### Frontend

- React.js
- Context API
- JavaScript (ES6+)
- Fetch API
- CSS
- js-cookie

### Backend

- Node.js
- Express.js
- MySQL (mysql2 with connection pooling)
- JWT Authentication

---

## 🔐 Authentication Flow

1. User logs in with credentials
2. Server generates JWT token
3. Token stored in cookies
4. Token sent in headers for protected APIs
5. Backend verifies token for secure data access

---

## 🌐 API Design

- RESTful APIs built with Express.js
- User-based data isolation
- Pagination, filtering, and search implemented
- Structured error handling

---

## Project Improvements (Ongoing Work)

1. Pagination
   - Fix incorrect `hasMore` logic (`rows.length === limit` issue)
   - Handle cases where total records are multiples of limit

2. Validation
   - Validate each field in the expense object individually

3. Date Filter
   - Use a single function for both month & year changes
   - Store dates as `Date` objects
   - Convert to string only when sending to backend

4. Loading State
   - Add loading indicators for add, edit, and update actions
   - Apply loading state for each API call

5. User Notifications
   - Show toast messages after add, update, or delete transactions

6. Expense Insights
   - Display current month and yearly total expenses in the dashboard

7. Form UX Improvements
   - Close form when clicking outside

8. Edit Form UX
   - Display previously used categories for quick selection

## 👨‍💻 Author

**Yugandhar Boya**  
Full Stack Developer | MERN Stack

- Portfolio: https://your-portfolio-link.com
- LinkedIn: https://linkedin.com/in/your-profile
