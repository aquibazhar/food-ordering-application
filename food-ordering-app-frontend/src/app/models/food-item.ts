import { Food } from './food';
import { FoodItemImage } from './food-item-image';

export class FoodItem {
  constructor(
    public id: number,
    public price: number,
    public description: string,
    public restaurantId: number,
    public food: Food,
    public image: FoodItemImage
  ) {}
}
