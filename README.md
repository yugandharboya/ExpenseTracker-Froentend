# 💰 Expense Tracker (Full Stack)

A production-focused full-stack Expense Tracker application built to manage personal finances efficiently. This project demonstrates real-world full-stack development skills such as authentication, REST API integration, scalable state management, filtering, dashboard analytics, loading/error handling, and responsive UI design.

## 🌐 Live Demo

Frontend: https://expense-tracker-froentend.vercel.app/login

Backend API: https://expensetracker-backend-lvzi.onrender.com

---

## ✨ Core Features

### Authentication

- JWT-based authentication
- Protected routes
- Auto logout handling on `401` / `403`
- Logged-in user API integration to display username dynamically in dashboard

### Dashboard

- Total expense summary
- Category-wise expense insights
- Recent transactions section
- Personalized dashboard greeting using logged-in user data
- Separate dashboard APIs for optimized performance
  - Summary API
  - Category summary API
  - Recent transactions API
- Month-wise filtering using backend APIs

### Transactions

- Add transaction
- Update transaction
- Delete transaction
- Get transactions with backend filtering
- Search transactions
- Category filtering
- Month/year filtering

### Filtering & Data Handling

- Backend-driven filtering (no frontend filtering)
- Dynamic month & year filtering using `startDate` and `endDate`
- Pagination with `Load More`
- Efficient `hasMore` handling
- Domain-based loading and error states

### State Management

Scalable Context API architecture:

1. DashboardContext
   - Handles dashboard summary
   - Category insights
   - Recent transactions
   - Logged-in user details

2. TransactionContext
   - Handles transaction CRUD operations
   - Pagination
   - Transactions fetching

3. FilterContext
   - Controls search
   - Category filtering
   - Date filters

4. UIContext
   - Handles UI state
   - Form visibility
   - Modals and UX states

### UI/UX Improvements

- Responsive UI
- Domain-based loading views
- Domain-based error handling
- Personalized dashboard greeting
- Better dashboard performance using separate APIs

---

## 🚀 Deployment

Frontend Hosting : Vercel  
Backend Hosting : Render  
Database : Railway (MySQL)

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Context API
- JavaScript (ES6+)
- Fetch API
- CSS
- js-cookie
- date-fns

### Backend

- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt

---

## 🔐 Authentication Flow

1. User logs in with credentials
2. Server generates JWT token
3. Token stored in cookies
4. Token sent in headers for protected APIs
5. Backend verifies token for secure access
6. Logged-in user details fetched using `/users/me`

---

## 🌐 API Integration

Frontend integrates with backend REST APIs for:

```txt
/auth/login
/auth/register
/users/me
/transactions
/dashboard/summary
/dashboard/category-summary
/dashboard/recent-transactions
```

---

## 🛠️ Setup

```bash
npm install
npm run dev
```

---

## 📂 Project Structure

```txt
src/
│
├── components/
├── context/
│   ├── DashboardContext
│   ├── TransactionContext
│   ├── FilterContext
│   └── UIContext
│
├── pages/
├── constants/
├── App.js
└── main.jsx
```

---

## 🚧 Future Improvements

1. Pagination Improvements
   - Improve `hasMore` logic for edge cases

2. Validation
   - Field-level validation

3. Loading Improvements
   - Add loading states for create/update/delete APIs

4. User Notifications
   - Toast messages after CRUD operations

5. Expense Insights
   - Monthly and yearly analytics

6. Form UX Improvements
   - Close modal on outside click

7. Edit Form Improvements
   - Show recent categories for quick selection

---

## 👨‍💻 Author

**Yugandhar Boya**  
Full Stack Developer | MERN Stack

GitHub:  
https://github.com/yugandharboya
