import React, { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Order } from "../types/Order";
import { OrderResponse } from '../types/OrderResponse';
import Layout from '../components/Layout';
import OrderTable from '../components/OrderTable';
import { Link } from 'react-router-dom';

const OrdersPage: React.FC = () => {
    const { loggedIn, isAdmin } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState("");

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                const response = await fetch(`/api/OrdersController/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });

                if (response.ok) {
                    // Remove the deleted order from state
                    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
                    setErrorMessage(`Order with ID ${id} deleted successfully.`);
                } else {
                    throw new Error("Failed to delete order.");
                }
            } catch (error) {
                setErrorMessage(`Error deleting order: ${error}`);
            }
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const endpoint = isAdmin ? "/api/OrdersController/admin" : "/api/OrdersController/user";
                const response = await fetch(endpoint, {
                    method: "GET",
                    credentials: "include"
                });

                if (response.ok) {
                    const data: OrderResponse[] = await response.json();
                    const orders: Order[] = data.map((order) => ({
                        id: order.id,
                        customerName: order.customerName,
                        orderDate: new Date(order.orderDate),
                        userId: order.userId,
                        user: order.user,
                        orderMenus: [],
                        totalPrice: order.totalPrice,
                    }));
                    setOrders(orders);
                } else {
                    const data = await response.json();
                    setErrorMessage(data.message || "Failed to fetch orders.");
                }
            } catch (err) {
                setErrorMessage("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (loggedIn) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [loggedIn, isAdmin]);

    useEffect(() => {
        if (errorMessage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [errorMessage]);

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Layout>
            <div className="content">
                <Box>
                    <Typography variant="h4">{isAdmin ? "All Orders" : "My Orders"}</Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            mb: { xs: 3, sm: 5 },
                            maxWidth: "800px",
                            "@media (max-width:600px)": {
                                width: "300px",
                            },
                        }}
                    >
                        {errorMessage && (
                            <div style={{ marginBottom: '20px' }}>
                                <Alert variant="filled" severity="error" >
                                    {errorMessage}
                                </Alert>
                            </div>
                        )}
                        <OrderTable orders={orders} handleDelete={handleDelete} />
                        <Button variant="contained" color="success" sx={{ mt: 3 }} component={Link} to={"/neworder"}>
                            Place Order
                        </Button>
                    </Box>
                </Box>
            </div>
        </Layout>
    );
};

export default OrdersPage;
