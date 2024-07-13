import React from 'react';
import AppRoutes from './routes';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
    return (
        <div>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </div>
    );
}

export default App;