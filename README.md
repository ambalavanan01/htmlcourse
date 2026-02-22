# 🔥 WebDev Learn

WebDev Learn is a modern, gamified, and interactive web development learning platform. It offers a structured curriculum combining HTML, CSS, and JavaScript tracks into bite-sized, granular lessons. Users can write, test, and instantly preview code in a live in-browser IDE!

## ✨ Features

- **Granular Learning Tracks**: Comprehensive curriculum inspired by W3Schools, broken down into 40 actionable, bite-sized lessons across HTML, CSS, and intermediate JavaScript.
- **Interactive Code Editor**: Integrated Monaco Editor (the heart of VS Code) allows users to write their code directly in the browser.
- **Live Output Iframe**: Instantly see HTML, CSS, and JS execute inside a secure rendering iframe.
- **Automated Code Validation**: Every lesson features a real-time testing suite that verifies user code against required goals before unlocking the next module.
- **Gamification Engine**:
  - **XP System**: Earn 50 Base XP for completing modules, and a 25 XP First-Try Bonus for writing perfect code.
  - **Daily Streaks**: Encourages habit-building with a consecutive login/completion tracker.
  - **Achievement Badges**: Earn "HTML Novice", "CSS Stylist", and "JavaScript Ninja" badges as you finish specific tracks.
  - **Live Leaderboard**: Displays the Top 5 students globally based on XP using real-time Firestore synchronization.
- **Secure Admin Panel**:
  - Protected routing allowing only authorized admins to monitor the platform.
  - Live statistics: Total active users, concepts mastered over time, and average completion rates.
  - Student Roster tracking exact module bottlenecks for each user.
- **Firebase Authentication**: Email and password registration with extended UI profiles.
- **Password Reset**: Fully functional password recovery flow via Firebase Auth.
- **Responsive & Modern UI**: Built with Tailwind CSS, glass-morphism panels, CSS gradients, dynamic SVGs, and a fully mobile-optimized Hamburger navigation menu.
- **Certificate Generation**: Upon completing the 40-lesson track, the platform generates a unique styled PDF Certificate using `html2canvas` and `jsPDF`, and seamlessly archives it into Firebase Storage.

## 🛠️ Technology Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS (v4) with `@tailwindcss/typography`
- **Routing**: React Router DOM (v6)
- **Database & Auth**: Firebase (Firestore, Auth, Storage)
- **Code Editor**: `@monaco-editor/react`
- **Markdown Parsing**: `react-markdown` with `remark-gfm`
- **PDF Generation**: `jspdf` & `html2canvas`
- **Icons**: `react-icons`

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- A [Firebase Project](https://console.firebase.google.com/) configured with Authentication, Firestore, and Storage.

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ambalavanan01/htmlcourse.git
   cd htmlcourse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

## 📦 Deployment (Vercel)

This application is configured as a Single Page Application (SPA). A `vercel.json` file is already included to handle React Router rewrites natively.

The platform is officially hosted at: **[https://webdevelopmentcourse.vercel.app/](https://webdevelopmentcourse.vercel.app/)**
Ensure you add all your `VITE_FIREBASE_*` variables into the Vercel Environment Variables dashboard!

## 🔐 Admin Access
To simulate admin capabilities, register an account with the exact email hardcoded in `AdminRoute.jsx` (currently set to `ambalavanan1501@gmail.com`). This unlocks the `/admin` route on the navigation bar.

---
*Built with ❤️ for aspiring web developers!*
