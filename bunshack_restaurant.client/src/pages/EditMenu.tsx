import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    TextField,
    Button,
    CircularProgress,
    Typography,
    Box,
    Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const EditMenu: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { loggedIn, isAdmin } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [menu, setMenu] = useState<{ foodName: string; price: number }>({ foodName: '', price: 0 });

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await fetch(`/api/MenusController/${id}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (response.ok) {
                    const data = await response.json();
                    setMenu(data);
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to fetch menu details.");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (loggedIn && isAdmin) {
            fetchMenu();
        } else {
            setLoading(false);
        }
    }, [id, loggedIn, isAdmin]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMenu(prevMenu => ({
            ...prevMenu,
            [name]: name === 'price' ? (parseFloat(value) || 0) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/MenusController/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(menu)
            });

            if (response.ok) {
                navigate('/admin');
            } else {
                const data = await response.json();
                setError(data.message || "Failed to update menu.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    if (!isAdmin) {
        return (<Typography variant="h4" align="center" color="error"><div>You do not have permission to view this page.</div></Typography>);
    }

    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (<Typography variant="body1" align="center" color="error">
            {error}
        </Typography>);
    }

    return (
        <Layout>
            <div className="content">
                <Container sx={{ mb: 15, "@media(max-width: 600px)": { mb: 10 } }}>

                    <Typography variant="h4" style={{ color: 'black' }} >
                        Edit Menu
                    </Typography>
                    <Box
                        sx={{
                            maxWidth: "400px",
                            margin: "auto",
                            padding: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            backgroundColor: "#fff",
                            "@media(max-width: 600px)": { "& h4 ": { fontSize: "1.5rem" } },
                        }}
                    >
                        <form className="update-menu" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        name="foodName"
                                        label="Food Name"
                                        value={menu.foodName}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="filled"
                                        name="price"
                                        label="Price"
                                        type="number"
                                        value={menu.price}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button variant="contained" color="success" type="submit" sx={{ mt: "20px" }} fullWidth>
                                Update Menu
                            </Button>
                            <Button variant="contained" color="primary" sx={{ mt: "20px" }} fullWidth component={Link}
                                to={"/admin"}>Back to All Menus</Button>
                        </form>
                    </Box>
                </Container>
            </div>
        </Layout>
    );
};

export default EditMenu;
