import { FoodCart } from './food-cart';
import { UserAddress } from './user-address';

export class OrderUser {
  constructor(
    public id: number,
    public foodCart: FoodCart[],
    public userName: string,
    public address: UserAddress,
    public orderStatus: string,
    public restaurantId: number
  ) {}
}
