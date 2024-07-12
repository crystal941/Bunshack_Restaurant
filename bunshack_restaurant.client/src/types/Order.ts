import { User } from './User';

export interface Order {
    id: string;
    customerName: string | null;
    orderDate: Date;
    orderMenus: OrderMenu[];
    userId: string | null;
    user: User | null;
    totalPrice: number;
}

export interface OrderMenu {
    orderId: string;
    menuId: string; 
    quantity: number;
}
