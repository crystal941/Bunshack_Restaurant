import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button
} from '@mui/material';
import { Order } from "../types/Order";
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../contexts/AuthContext';

interface OrderTableProps {
    orders: Order[];
    handleDelete: (id: string) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({ orders, handleDelete }) => {
    const { isAdmin } = useAuth();

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Index</TableCell>
                        {isAdmin && (<TableCell sx={{ fontWeight: "bold" }}>Customer Name</TableCell>)}
                        <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Total (NZ$)</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Details</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No orders available
                            </TableCell>
                        </TableRow>
                    ) : (
                        orders.map((order, index) => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                {isAdmin && (
                                    <TableCell>{order.customerName}</TableCell>
                                )}
                                <TableCell>{order.orderDate.toLocaleDateString()}</TableCell>
                                <TableCell align="right">{order.totalPrice}</TableCell>
                                <TableCell>
                                    <Link to={`/order/${order.id}`}>
                                        View Details </Link>
                                </TableCell>
                                <TableCell align="center">
                                    {/* Conditionally render IconButton on mobile */}
                                    <IconButton
                                        component={Link}
                                        to={`/editOrder/${order.id}`}
                                        sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    {/* Conditionally render Button on desktop */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={`/editOrder/${order.id}`}
                                        sx={{ display: { xs: 'none', sm: 'inline-flex' }, marginRight: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    {/* Conditionally render IconButton on mobile */}
                                    <IconButton
                                        onClick={() => handleDelete(order.id)}
                                        style={{ marginLeft: '10px' }}
                                        sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    {/* Conditionally render Button on desktop */}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(order.id)}
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
    );
};

export default OrderTable;
