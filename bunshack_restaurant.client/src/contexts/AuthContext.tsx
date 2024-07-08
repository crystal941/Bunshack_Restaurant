import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from "../types/User";
import { Container, CircularProgress } from '@mui/material';

interface AuthContextType {
    loggedIn: boolean;
    user: User | null;
    isAdmin: boolean;
    login: (email: string, password: string, remember: boolean) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // useNavigate hook from react-router-dom

    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await fetch('/api/LoginController/check/', {
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                    setLoggedIn(true);
                    setIsAdmin(data.isAdmin || data.user.isAdmin);
                } else {
                    setLoggedIn(false);
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Error checking user status: ", error);
                setLoggedIn(false);
                localStorage.removeItem("user");
            } finally {
                setLoading(false);
            }
        };
        checkUserStatus();
    }, []);

    const login = async (email: string, password: string, remember: boolean) => {
        try {
            const response = await fetch("api/LoginController/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({ Email: email, Password: password, Remember: remember }),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("user", email);
                setUser(data.user);
                setLoggedIn(true);
                setIsAdmin(data.isAdmin !== undefined ? data.isAdmin : false);
            } else {
                throw new Error(data.message || "Something went wrong, please try again");
            }
        } catch (error) {
            console.error("Login error: ", error);
            setLoggedIn(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await fetch("api/LoginController/logout", {
                method: "GET",
                credentials: "include",
            });

            if (response.ok) {
                setLoggedIn(false);
                setUser(null);
                setIsAdmin(false);
                localStorage.removeItem("user");
                navigate('/'); // Use navigate to redirect to home page
            } else {
                throw new Error("Failed to logout, please try again");
            }
        } catch (error) {
            console.error("Logout error: ", error);
            throw error;
        }
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <AuthContext.Provider value={{ loggedIn, user, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
