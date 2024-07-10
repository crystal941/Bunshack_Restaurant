import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
    CircularProgress,
    Container,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import { Menu } from '../types/Menu';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'

const AdminPage: React.FC = () => {
    const { loggedIn, isAdmin } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [menus, setMenus] = useState<Menu[]>([]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const response = await fetch("/api/MenusController/admin", {
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
                const response = await fetch("/api/MenusController/${id}",
                    {
                    method: "DELETE",
                    credentials: "include"
                });

                if (response.ok) {
                    // Remove the deleted menu from state
                    setMenus(prevMenus => prevMenus.filter(menu => menu.id !== id));
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to delete menu.");
                }
            } catch (err) {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    if (!loggedIn) {
        return (<Typography variant="h4" align="center" color="error"><div>Please log in to access this page.</div></Typography>);
    }

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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" style={{ color: 'black' }}>All Menus</Typography>
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
                                            <TableCell align="center">{menu.price}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="primary" component={Link} to={`/editMenu/${menu.id}`} >Edit</Button>
                                            <Button variant="contained" color="secondary" onClick={() => handleDelete(menu.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                                        </TableCell>
                                        </TableRow>
                            ))
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="success" sx={{ mt: 3 }} ><Link to="/addMenu" style={{ color: 'white', textDecoration: 'none' }}>Add Menu</Link></Button>
            </Box>
        </div>
        </Layout >
    );

};

export default AdminPage;