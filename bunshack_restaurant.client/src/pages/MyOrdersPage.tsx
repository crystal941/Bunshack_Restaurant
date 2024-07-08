import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Order } from "../types/Order";
import { OrderResponse } from '../types/OrderResponse';
import Layout from '../components/Layout';

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
                        orderNumber: index + 1 // Calculate order number (index + 1)
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
        return
        (<Typography variant="body1" align="center" color="error">
            <div>Please log in to access this page.</div>
        </Typography>);
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
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Customer Name</TableCell>
                                            <TableCell>Order Date</TableCell>
                                            <TableCell>Order Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">
                                                    No orders available
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            orders.map(order => (
                                                <TableRow key={order.id}>
                                                    <TableCell>{order.orderNumber}</TableCell> {/* Display orderNumber instead of order.id */}
                                                    <TableCell>{order.customerName}</TableCell>
                                                    <TableCell>{order.orderDate.toString()}</TableCell>
                                                    <TableCell>
                                                        <Table>
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Food Name</TableCell>
                                                                    <TableCell>Quantity</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {order.orderMenus.map(orderMenu => (
                                                                    <TableRow key={orderMenu.menuId}>
                                                                        <TableCell>{orderMenu.menu?.foodName}</TableCell>
                                                                        <TableCell>{orderMenu.quantity}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>

                                </Table>
                            </TableContainer>
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
