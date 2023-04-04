import { FoodItem } from './food-item';

export class CategoryFood {
  constructor(public category: string, public foodItem: FoodItem[]) {}
}
