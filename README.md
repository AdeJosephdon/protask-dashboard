# ProTask - A Modern Productivity Dashboard

A feature-rich task management and productivity dashboard built with React.
Designed to showcase real-world frontend skills that employers look for: authentication, state management, charts, modals, accessibility, dark mode, and responsive design.

## 🌟 Features

### ✅ Authentication

    - Login, Register, Logout (with session persistence).
    - Simulated authentication.
    - Protected routes to secure user data.

### ✅ Dashboard Overview

    - Key stats: Active tasks, Completed tasks, Upcoming deadlines.
    - Responsive sidebar navigation.

### ✅ Task Management (CRUD)

    - Add, edit, delete, and complete tasks.
    - Assign priority (Low/Moderate/Extreme).
    - Task statuses: Not Started, In Progress, Completed.

### ✅ Analytics

    - Pie chart: Distribution of task statuses.

### ✅ Filters & Search

    - Search by title/description.

### ✅ User Settings

    - Update profile details (CRUD).
    - Toggle Light/Dark mode with CSS variables.

### ✅ Notifications & Feedback

    - Notifications for user actions.
    - Form validation with error messages.
    - Loading states and error boundaries.

### ✅ Responsive Design

    - Mobile-first, adaptive layout.
    - Smooth transitions and animations.

### ✅ Accessibility First – Semantic HTML, ARIA labels, keyboard navigation

## 🛠 Tech Stack

- Frontend: React (Hooks, Context API), React Router

- UI: Recreated from Figma, fully mobile-friendly, CSS Modules (or Styled Components), Responsive Grid/Flexbox

- Version Control: Git, GitHub

- API: Task Management using MockAPI.

- Charts: SVG & Javascript.

- Forms & Validation.

- Notifications.

- Deployment: Vercel.

## ⚡ Installation

1. Clone the repo:

git clone: [https://github.com/AdeJosephdon/protask-dashboard.git](https://github.com/AdeJosephdon/protask-dashboard.git)

cd protask

2. Install dependencies:

npm install

3. Run the development server:

npm run start

4. Build for production:

npm run build

---

## 🔑 Environment Variables

Create a .env file in the root with:

REACT_APP_API_BASE = "https://your-api-key.mockapi.io/"

## 🧪 Testing

This project uses Jest + React Testing Library.

- Run tests:

npm test

- Example tested components:

App.js → validates required fields.

TaskForm → validates required fields.

LoginForm → handles incorrect login attempts.

ProtectedRoute → prevents access without token.

## 📊 Screenshots

- [Dashboard (Light)](/public/assets/protask-dashboard%202.png)

- [Dashboard (Dark)](/public/assets/protask-dashboard%203.png)

## 🚀 Deployment

Deployed on Vercel.

🔗 Live Demo: [https://protask-dashboard.vercel.app/](https://protask-dashboard.vercel.app/)

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo

2. Create a new branch (feature/new-feature)

3. Commit changes

4. Open a pull request

5. You can add a fully functional backend.

## 👨‍💻 Author

## Adegboyega Joseph

### 🌐 Portfolio: [my-portfolio-link](https://josephdonportfolio.vercel.app/)

### 💼 LinkedIn: [my-linkedin-link](https://www.linkedin.com/in/adegboyega-joseph-444b36164?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)
