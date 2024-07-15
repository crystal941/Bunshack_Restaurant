import React, { useEffect } from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    styled,
    useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { RegisterData } from "../types/RegisterData"

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/orders");
        }
    }, [navigate]);

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const dataToSend: RegisterData = {
            Name: "",
            Email: "",
            PasswordHash: "",
            Role: "Customer", // Default role is customer
        };

        formData.forEach((value, key) => {
            dataToSend[key as keyof RegisterData] = value as string;
        });

        // Create unqie username with timestamp
        const newUserName = dataToSend.Name.trim().split(" ");
        const timestamp = Date.now(); // Get current timestamp
        dataToSend.UserName = `${newUserName.join("")}_${timestamp}`;

        try {
            const response = await fetch("api/LoginController/register", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(dataToSend),
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/login");
            } else {
                const messageEl = document.querySelector(".message");
                if (messageEl) {
                    if (data.message) {
                        messageEl.innerHTML = data.message;
                    } else {
                        let errorMessages = "<div>Attention please:</div><div class='normal'>";
                        data.errors.forEach((error: { description: string }) => {
                            errorMessages += error.description + " ";
                        });

                        errorMessages += "</div>";
                        messageEl.innerHTML = errorMessages;
                    }
                }
            }
        } catch (error) {
            console.error("Register error:", error);
        }
    };

    return (
        <Layout>
            <div className="content-wrapper">
                <Container sx={{ mb: 15, "@media(max-width: 600px)": { mb: 10 } }}>
                    <div className="content">
                        <Typography variant="h4">
                            Thank you for choosing BunShack Breakfast!
                        </Typography>
                    </div>
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
                        <Typography variant="h4" align="center" gutterBottom>
                            Register
                        </Typography>
                        <form className="register" onSubmit={registerHandler}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="Name"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="Email"
                                        type="email"
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        name="PasswordHash"
                                        type="password"
                                        required
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                sx={{ mt: "20px" }}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Register
                            </Button>
                        </form>
                        <Typography
                            variant="body1"
                            align="center"
                            className="message"
                            sx={{ mt: "20px" }}
                        ></Typography>
                        <Typography variant="body1" align="center" sx={{ mt: "20px" }}>
                            Or <StyledLink to="/login" themeMode={theme.palette.mode}>Login</StyledLink>
                        </Typography>
                    </Box>
                </Container>
                <br />
            </div>
        </Layout>
    );
};

const StyledLink = styled(Link)(({ themeMode }: { themeMode: 'light' | 'dark' }) => ({
    color: themeMode === 'dark' ? 'yellow' : 'darkviolet',
    fontWeight: "bold",
    "&:hover": { color: "red" },
}));

export default RegisterPage;
