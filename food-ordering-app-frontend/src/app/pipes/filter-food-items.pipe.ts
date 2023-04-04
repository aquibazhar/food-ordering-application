import { Pipe, PipeTransform } from '@angular/core';
import { FoodItem } from '../models/food-item';

@Pipe({
  name: 'filterFoodItems',
})
export class FilterFoodItemsPipe implements PipeTransform {
  transform(value: FoodItem[], searchInput: string): FoodItem[] {
    let filteredFoodItems: FoodItem[] = [];

    value.forEach((foodItem) => {
      if (
        foodItem.food.foodName
          .toLowerCase()
          .includes(searchInput.trim().toLowerCase()) ||
        foodItem.food.cuisine
          .toLowerCase()
          .includes(searchInput.trim().toLowerCase()) ||
        foodItem.description
          .toLowerCase()
          .includes(searchInput.trim().toLowerCase()) ||
        foodItem.food.mealType
          .toLowerCase()
          .includes(searchInput.trim().toLowerCase())
      ) {
        filteredFoodItems.push(foodItem);
      }
    });
    // if (searchInput === 'default') {
    //   return true;
    // }

    return filteredFoodItems;
  }
}
