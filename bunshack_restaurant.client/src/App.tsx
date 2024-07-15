import React from 'react';
import AppRoutes from './routes';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import ThemeContextProvider from './contexts/ThemeContext';

const App: React.FC = () => {
    return (
        <div>
            <ThemeContextProvider>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </ThemeContextProvider>
        </div>
    );
}

export default App;