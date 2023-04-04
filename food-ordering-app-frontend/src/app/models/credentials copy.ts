import { Cart } from './cart';
import { FoodItem } from './food-item';

export class Credentials {
  constructor(public foodItem: FoodItem, public cartItem: Cart) {}
}
