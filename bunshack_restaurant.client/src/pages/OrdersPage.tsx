import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Order } from "../types/Order";
import { OrderResponse } from '../types/OrderResponse';
import Layout from '../components/Layout';
import OrderTable from '../components/OrderTable';

const OrdersPage: React.FC = () => {
    const { loggedIn, isAdmin } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState("");

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
                    const orders: Order[] = data.map((order, index) => ({
                        id: order.id,
                        customerName: order.customerName,
                        orderDate: new Date(order.orderDate),
                        userId: order.userId,
                        user: order.user,
                        orderMenus: order.orderMenus.map(orderMenu => ({
                            orderId: orderMenu.orderId,
                            order: orderMenu.order,
                            menuId: orderMenu.menuId,
                            menu: orderMenu.menu,
                            quantity: orderMenu.quantity
                        })),
                        orderNumber: index + 1 // Calculate alias order number (index + 1)
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

    if (!loggedIn) {
        return (
            <Typography variant="body1" align="center" color="error">
                Please log in to access this page.
            </Typography>
        );
    }

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Layout>
            <div className="content-wrapper">
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
                                width: "600px",
                                "@media (max-width:600px)": {
                                    width: "300px",
                                },
                            }}
                        >
                            <OrderTable orders={orders} />
                        </Box>
                    </Box>
                </div>
            </div>
            {errorMessage && (
                <Typography variant="body1" align="center" color="error">
                    {errorMessage}
                </Typography>
            )}
        </Layout>
    );
};

export default OrdersPage;
