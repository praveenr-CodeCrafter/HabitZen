import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ResetPassword from './pages/ResetPasswordPage';
import Dashboard from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  // TODO: Implement proper auth check
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<SettingsPage />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
                {/* <SettingsPage /> */}
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;