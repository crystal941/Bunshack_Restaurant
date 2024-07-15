import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AddMenuPage: React.FC = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [foodName, setFoodName] = useState("");
    const [price, setPrice] = useState("");

    const addMenuHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newMenu = {
            FoodName: foodName,
            Price: parseFloat(price),
        };

        try {
            const response = await fetch("/api/MenusController", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(newMenu),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            if (response.ok) {
                navigate("/admin"); // Redirect to all menus list page
            }
        } catch (error) {
            console.error("Add menu error:", error);
        }
    };

    if (!isAdmin) {
        return (<Alert variant="filled" severity="error">You do not have permission to view this page.</Alert>);
    }

    return (
        <Layout>
            <div className="content">
                <Container sx={{ mb: 15, "@media(max-width: 600px)": { mb: 10 } }}>
                    <Typography variant="h4">
                        Add New Menu Item
                    </Typography>
                    <Box
                        sx={{
                            maxWidth: "400px",
                            margin: "auto",
                            padding: "20px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                            "@media(max-width: 600px)": { "& h4 ": { fontSize: "1.5rem" } },
                        }}
                    >
                        <form className="add-menu" onSubmit={addMenuHandler}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="foodName"
                                        label="Food Name"
                                        value={foodName}
                                        onChange={(e) => setFoodName(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="price"
                                        label="Price"
                                        type="float"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                sx={{ mt: "20px" }}
                                type="submit"
                                variant="contained"
                                color="success"
                                fullWidth
                            >
                                Add Menu
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

export default AddMenuPage;
