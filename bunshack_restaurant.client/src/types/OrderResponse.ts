import { User } from './User';
import { OrderMenu } from './Order'; 

export interface OrderResponse {
    id: string;
    customerName: string | null;
    orderDate: string; 
    userId: string | null;
    user: User | null;
    orderMenus: OrderMenu[];
}
