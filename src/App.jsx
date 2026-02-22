import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Lesson from './pages/Lesson';
import Certificate from './pages/Certificate';
import OnlineCompiler from './pages/OnlineCompiler';

import AdminRoute from './components/common/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';

import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />

            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="lesson/:lessonId" element={
              <ProtectedRoute>
                <Lesson />
              </ProtectedRoute>
            } />
            <Route path="certificate" element={
              <ProtectedRoute>
                <Certificate />
              </ProtectedRoute>
            } />
            <Route path="compiler" element={<OnlineCompiler />} />
            <Route path="admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
