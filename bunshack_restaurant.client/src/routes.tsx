import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomPage from './pages/WelcomePage';
import OrdersPage from './pages/OrdersPage';
import GetOrder from './pages/GetOrder';
import NewOrder from './pages/NewOrder';
import EditOrder from './pages/EditOrder';
import MenuPage from './pages/MenuPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/AdminPage';
import AddMenu from './pages/AddMenu';
import EditMenu from './pages/EditMenu';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { loggedIn } = useAuth();
    return loggedIn ? children : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage /> } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/welcome" element={<ProtectedRoute><WelcomPage /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/order/:id" element={<ProtectedRoute><GetOrder /></ProtectedRoute>} />
            <Route path="/editOrder/:id" element={<ProtectedRoute><EditOrder /></ProtectedRoute>} />
            <Route path="/neworder" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/addmenu" element={<ProtectedRoute><AddMenu /></ProtectedRoute>} />
            <Route path="/editMenu/:id" element={<ProtectedRoute><EditMenu /></ProtectedRoute>} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;