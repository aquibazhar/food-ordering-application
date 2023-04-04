import { OrderItem } from './order-item';

export class Order {
  constructor(
    public id: number,
    public price: number,
    public userId: number,
    public userAddressId: number,
    public orderStatus: string,
    public orderItems: OrderItem[],
    public transactionId: string,
    public orderedOn: string,
    public restaurantId: number
  ) {}
}
