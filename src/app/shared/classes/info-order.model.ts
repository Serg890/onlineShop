import { IOrder } from './../interfaces/info-order.interface';
export class Order implements IOrder {
  constructor(
    public id: string,
    public infoPerson: string,
    public phone: number,
    public city: string,
    public email: string
  ) {}
}
