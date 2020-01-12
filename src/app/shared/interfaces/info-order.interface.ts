import { IProducts } from './admin-product.interface';
export interface IOrder {
    id: string;
    infoPerson: string;
    phone: number;
    city: string;
    email: string;
    order: IProducts;
}
