import { Food } from './food';
import { FoodItem } from './food-item';

export class FoodCart {
  constructor(
    public cartId: number,
    public foodItem: FoodItem,
    public quantity: number
  ) {}
}
