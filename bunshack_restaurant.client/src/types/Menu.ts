import { OrderMenu } from './Order';

export interface Menu {
    id: string;
    foodName: string | null;
    price: number;
    orderMenus: OrderMenu[];
}
