import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from '@mui/material';
import { OrderMenu } from '../types/Order';
import { Menu } from '../types/Menu';
import { useAuth } from '../contexts/AuthContext';

interface OrderMenuTableProps {
    orderId: string;
}

const MenuTable: React.FC<OrderMenuTableProps> = ({ orderId }) => {
    const [orderMenus, setOrderMenus] = useState<OrderMenu[]>([]);
    const [menus, setMenus] = useState<Menu[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrderMenus = async () => {
            if (!orderId) {
                console.error("Order ID is undefined");
                return;
            }
            try {
                const response = await fetch(`/api/OrdersController/${orderId}/menus`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch menus for order ID ${orderId}`);
                }
                const orderMenus = await response.json();
                setOrderMenus(orderMenus);

                // Fetch menu details for each orderMenu.menuId
                const menuDetails = await fetchMenuDetails(orderMenus);
                setMenus(menuDetails);
            } catch (error) {
                console.error("Error fetching menus:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderMenus();
    }, [orderId, user]);

    const fetchMenuDetails = async (orderMenus: OrderMenu[]): Promise<Menu[]> => {
        const menuRequests = orderMenus.map(async (orderMenu) => {
            try {
                const response = await fetch(`/api/MenusController/${orderMenu.menuId}`, {
                    method: "GET",
                    credentials: "include"
                });
                if (response.ok) {
                    const menuData = await response.json();
                    return menuData;
                } else {
                    throw new Error(`Failed to fetch menu details for menu ID ${orderMenu.menuId}`);
                }
            } catch (error) {
                console.error(`Error fetching menu details for menu ID ${orderMenu.menuId}:`, error);
            }
        });
        // Wait for all menu detail requests to complete
        return Promise.all(menuRequests);
    };

    const calculateTotalPrice = (menu: Menu, quantity: number): number => {
        return menu.price * quantity;
    };

    if (loading) {
        return (
            <TableContainer component={Paper}>
                <CircularProgress />
            </TableContainer>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Index</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Food Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Quantity</TableCell>
                        <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>Total (NZ$)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderMenus.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                No menu items available
                            </TableCell>
                        </TableRow>
                    ) : (
                        orderMenus.map((orderMenu, index) => {
                            const menu = menus[index];
                            if (!menu) return null;
                            const totalPrice = calculateTotalPrice(menu, orderMenu.quantity);

                            return (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{menu.foodName}</TableCell>
                                    <TableCell align="center">{orderMenu.quantity}</TableCell>
                                    <TableCell align="right">{totalPrice.toFixed(2)}</TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MenuTable;
