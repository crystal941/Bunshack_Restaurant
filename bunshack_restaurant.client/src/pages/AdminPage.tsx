import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    CircularProgress,
    Container,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Alert,
} from '@mui/material';
import { Menu } from '../types/Menu';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminPage: React.FC = () => {
    const { loggedIn, isAdmin } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [deleteMessage, setDeleteMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch("/api/MenusController", {
                    method: "GET",
                    credentials: "include"
                });

                if (response.ok) {
                    const data: Menu[] = await response.json();
                    setMenus(data);
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to fetch menus.");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        if (loggedIn && isAdmin) {
            fetchMenus();
        } else {
            setLoading(false);
        }
    }, [loggedIn, isAdmin]);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this menu?")) {
            try {
                const response = await fetch(`/api/MenusController/${id}`, {
                    method: "DELETE",
                    credentials: "include"
                });

                if (response.ok) {
                    // Remove the deleted menu from state
                    setMenus(prevMenus => prevMenus.filter(menu => menu.id !== id));
                    setDeleteMessage(`Menu with ID ${id} deleted successfully.`);
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to delete menu.");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    useEffect(() => {
        if (deleteMessage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [deleteMessage]);

    if (!isAdmin) {
        return (<Alert variant="filled" severity="error">You do not have permission to view this page.</Alert>);
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
            <div className="content">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" style={{ color: 'black' }}>All Menus</Typography>
                    {deleteMessage && (
                        <Alert variant="filled" severity="warning" sx={{ marginBottom: "20px" }}>
                            {deleteMessage}
                        </Alert>
                    )}
                    <TableContainer component={Paper} sx={{ maxWidth: "600px" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "bold" }}>Food Name</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Price (NZ$)</TableCell>
                                    <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
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
                                            <TableCell align="center">
                                                {/* Conditionally render IconButton on mobile */}
                                                <IconButton
                                                    component={Link}
                                                    to={`/editMenu/${menu.id}`}
                                                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                {/* Conditionally render Button on desktop */}
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    component={Link}
                                                    to={`/editMenu/${menu.id}`}
                                                    sx={{ display: { xs: 'none', sm: 'inline-flex' }, marginRight: 1 }}
                                                >
                                                    Edit
                                                </Button>
                                                {/* Conditionally render IconButton on mobile */}
                                                <IconButton
                                                    onClick={() => handleDelete(menu.id)}
                                                    style={{ marginLeft: '10px' }}
                                                    sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                {/* Conditionally render Button on desktop */}
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => handleDelete(menu.id)}
                                                    style={{ marginLeft: '10px' }}
                                                    sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button variant="contained" color="success" sx={{ mt: 3 }} component={Link} to={"/addMenu"}>
                        Add Menu
                    </Button>
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

export default AdminPage;
