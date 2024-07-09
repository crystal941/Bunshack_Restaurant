import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { Order } from "../types/Order";
import { Link } from 'react-router-dom';

interface OrderTableProps {
    orders: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orders }) => {
    return (
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
                                <TableCell>
                                        {order.orderNumber}
                                </TableCell>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.orderDate.toString()}</TableCell>
                                <TableCell>
                                    <Link to={`/order/${order.id}`}>
                                        View Details
                                    </Link>
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
