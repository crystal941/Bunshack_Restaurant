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
import { OrderMenu } from "../types/Order";

interface MenuTableProps {
    orderMenus: OrderMenu[];
}

const MenuTable: React.FC<MenuTableProps> = ({ orderMenus }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Food Name</TableCell>
                        <TableCell>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderMenus.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={2} align="center">
                                No menu items available
                            </TableCell>
                        </TableRow>
                    ) : (
                        orderMenus.map(orderMenu => (
                            <TableRow key={orderMenu.menuId}>
                                <TableCell>{orderMenu.menu?.foodName}</TableCell>
                                <TableCell>{orderMenu.quantity}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MenuTable;
