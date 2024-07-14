import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Container,
    Typography,
    CircularProgress,
    Grid,
} from '@mui/material';
import { Order } from "../types/Order";
import Layout from '../components/Layout';
import MenuTable from '../components/MenuTable';

const GetOrder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`/api/OrdersController/${id}`, {
                    method: "GET",
                    credentials: "include"
                });
                //console.log(response);
                if (response.ok) {
                    const data: Order = await response.json();
                    //console.log(data);
                    setOrder(data);
                    setLoading(false);
                } else {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || "Failed to fetch order.");
                    setLoading(false);
                }
            } catch (err) {
                setErrorMessage("Something went wrong. Please try again.");
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                const response = await fetch(`/api/OrdersController/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });

                if (response.ok) {
                    //setErrorMessage(`Order with ID ${id} deleted successfully.`);
                    navigate("/orders");
                } else {
                    throw new Error("Failed to delete order.");
                }
            } catch (error) {
                setErrorMessage(`Error deleting order: ${error}`);
            }
        }
    };

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (errorMessage) {
        return (
            <Alert variant="filled" severity="error">
                {errorMessage}
            </Alert>
        );
    }

    return (
        <Layout>
            <div className="content">
                <Box>
                    <Typography variant="h4" style={{ color: "black" }}>Order Details</Typography>
                </Box>
                {order && (
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
                            <Box sx={{ display: "flex", flexDirection: "row", }}>
                                <Grid container spacing={2} justifyContent="center" marginBottom="30px">
                                    <Grid item xs={12}>Order ID: {order.id} </Grid>
                                    <Grid item xs={12}>Customer Name: {order.customerName}</Grid>
                                    <Grid item xs={12}>Order Date: {order.orderDate ? order.orderDate.toString().split("T")[0] : ""}</Grid>
                                    <Grid item xs={12}>Order Total Price: NZ${order.totalPrice}</Grid>
                                </Grid>
                            </Box>
                            <MenuTable orderId={order.id} />
                            <Grid container spacing={2} justifyContent="center" marginTop="30px">
                                <Grid item xs={12} sm={4}><Button variant="contained" color="error" onClick={handleDelete}>
                                    Delete Order
                                </Button></Grid>
                                <Grid item xs={12} sm={4}><Button variant="contained" color="secondary" component={Link} to={`/editOrder/${order.id}`}>
                                    Edit Order
                                </Button></Grid>
                                <Grid item xs={12} sm={4}> <Button variant="contained" component={Link} to={"/orders"} >
                                    All Orders
                                </Button></Grid>
                            </Grid>
                        </Box>
                    </Box>
                )}
            </div>
        </Layout>
    );
};

export default GetOrder;
