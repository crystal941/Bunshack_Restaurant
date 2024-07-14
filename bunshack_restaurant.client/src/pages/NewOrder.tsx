import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Order } from '../types/Order';
import { Menu } from '../types/Menu';
import {
    Alert,
    Container,
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
    TableRow, Paper
} from '@mui/material';
import Layout from "../components/Layout";

const NewOrder: React.FC = () => {
    const { loggedIn, user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [orderMenus, setOrderMenus] = useState<{ menuId: string; quantity: number }[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);


    useEffect(() => {
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
                const data = await response.json();
                setMenus(data);
            } catch (error) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (loggedIn) {
            fetchMenus();
        } else {
            setLoading(false);
        }
    }, [loggedIn]);

    const handleQuantityChange = (menuId: string, quantity: number) => {
        const updatedOrderMenus = [...orderMenus];
        const index = updatedOrderMenus.findIndex(item => item.menuId === menuId);

        if (index !== -1) {
            updatedOrderMenus[index].quantity = quantity;
        } else {
            updatedOrderMenus.push({ menuId, quantity });
        }

        setOrderMenus(updatedOrderMenus);

        const newTotalPrice = updatedOrderMenus.reduce((total, item) => {
            const menu = menus.find(m => m.id === item.menuId);
            return total + (menu ? menu.price * item.quantity : 0);
        }, 0);
        setTotalPrice(newTotalPrice);
    };


    const submitOrderHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const completeOrderMenus = orderMenus.map(({ menuId, quantity }) => ({
            orderId: '00000000-0000-0000-0000-000000000000', // This will be assigned on the server side
            menuId,
            quantity
        }));

        const newOrder: Order = {
            customerName: user?.name || null,
            orderDate: new Date(),
            orderMenus: completeOrderMenus,
            userId: user?.id || null,
            user: user,
            id: '00000000-0000-0000-0000-000000000000', // This will be assigned on the server side
            totalPrice: totalPrice,
        };

        try {
            const response = await fetch("/api/OrdersController", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(newOrder),
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
            console.error("Failed to place order:", error);
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
        <Layout>
            <div className="content">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" style={{ color: 'black' }}>Place New Order</Typography>
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
                                    {menus.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} align="center">
                                                No menus available
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        menus.map((menu, index) => (
                                            <TableRow key={menu.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{menu.foodName}</TableCell>
                                                <TableCell align="right">{menu.price}</TableCell>
                                                <TextField
                                                    id={`quantity-${menu.id}`}
                                                    select
                                                    value={orderMenus.find(item => item.menuId === menu.id)?.quantity || 0}
                                                    onChange={(e) => handleQuantityChange(menu.id, parseInt(e.target.value))}
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                >
                                                    {[...Array(11).keys()].map(num => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </TextField>
                                            </TableRow>

                                        )))}
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
                            color="success"
                        >
                            Submit Order
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

export default NewOrder;