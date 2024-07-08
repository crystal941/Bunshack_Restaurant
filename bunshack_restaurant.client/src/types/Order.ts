import { User } from './User';
import { Menu } from './Menu';

export interface Order {
    id: string;
    customerName: string | null;
    orderDate: Date;
    orderMenus: OrderMenu[];
    userId: string | null;
    user: User | null;
}

export interface OrderMenu {
    orderId: string;
    order: Order | null;
    menuId: string; 
    menu: Menu | null;
    quantity: number;
}
