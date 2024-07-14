import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Order, OrderMenu } from '../types/Order';
import { Menu } from '../types/Menu';
import {
    Alert,
    CircularProgress,
    Box,
    Button,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import Layout from "../components/Layout";

const EditOrder: React.FC = () => {
    const { loggedIn } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [order, setOrder] = useState<Order | null>(null);
    const [orderMenus, setOrderMenus] = useState<OrderMenu[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [menus, setMenus] = useState<Menu[]>([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/OrdersController/${id}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setOrder(data as Order);
                setOrderMenus(data.orderMenus);
                fetchMenus();
            } catch (error) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        const fetchMenus = async () => {
            try {
                const response = await fetch("/api/MenusController", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setMenus(data);
            } catch (error) {
                setError("Something went wrong while fetching menus.");
            }
        };

        if (loggedIn) {
            fetchOrder();
        } else {
            setLoading(false);
        }
    }, [loggedIn, id]);

    const calculateTotalPrice = useCallback((orderMenus: OrderMenu[]) => {
        const newTotalPrice = orderMenus.reduce((total, item) => {
            const menu = menus.find((m) => m.id === item.menuId);
            return total + (menu ? menu.price * item.quantity : 0);
        }, 0);
        setTotalPrice(newTotalPrice);
    }, [menus]);

    useEffect(() => {
        calculateTotalPrice(orderMenus);
    }, [calculateTotalPrice, orderMenus]);

    const handleQuantityChange = (menuId: string, quantity: number) => {
        const updatedOrderMenus = orderMenus.map((item) => {
            if (item.menuId === menuId) {
                return {
                    ...item,
                    quantity: quantity,
                };
            }
            return item;
        });

        setOrderMenus(updatedOrderMenus);
        calculateTotalPrice(updatedOrderMenus);
    };

    const submitOrderHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedOrder: Order = {
            ...order!,
            orderMenus: orderMenus.map(({ menuId, quantity }) => ({
                orderId: order!.id,
                menuId,
                quantity,
            })),
            totalPrice: totalPrice,
        };

        try {
            const response = await fetch(`/api/OrdersController/${id}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(updatedOrder),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                navigate("/orders");
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update order:", error);
        }
    };

    if (loading) {
        return (
            <TableContainer component={Paper}>
                <CircularProgress />
            </TableContainer>
        );
    }

    return (
        <Layout>
            <div className="content">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" style={{ color: 'black' }}>Edit Order</Typography>
                    <form onSubmit={submitOrderHandler}>
                        <TableContainer component={Paper} sx={{ maxWidth: "600px" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Index</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Food Name</TableCell>
                                        <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Price (NZ$)</TableCell>
                                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orderMenus.map((orderMenu, index) => {
                                        const menu = menus.find((m) => m.id === orderMenu.menuId);
                                        return (
                                            <TableRow key={orderMenu.menuId}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{menu?.foodName}</TableCell>
                                                <TableCell align="right">{menu?.price}</TableCell>
                                                <TableCell align="center">
                                                    <TextField
                                                        id={`quantity-${orderMenu.menuId}`}
                                                        select
                                                        value={orderMenu.quantity}
                                                        onChange={(e) => handleQuantityChange(orderMenu.menuId, parseInt(e.target.value))}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                    >
                                                        {[...Array(11).keys()].map(num => (
                                                            <option key={num} value={num}>{num}</option>
                                                        ))}
                                                    </TextField>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    <TableRow>
                                        <TableCell colSpan={3} align="right" sx={{ fontWeight: "bold" }}>Total Price:</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: "bold", paddingRight: "16px" }}>
                                            ${totalPrice.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button
                            sx={{ mt: "20px" }}
                            type="submit"
                            variant="contained"
                            color="secondary"
                        >
                            Update Order
                        </Button>
                        <Button variant="contained" sx={{ mt: "20px", ml: " 30px" }} component={Link} to={"/orders"} >
                            All Orders
                        </Button>
                    </form>
                    {error && (
                        <div style={{ marginTop: '20px' }}>
                            <Alert variant="filled" severity="error">
                                {error}
                            </Alert>
                        </div>
                    )}
                </Box>
            </div>
        </Layout>
    );
};

export default EditOrder;