import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { CategoryFood } from 'src/app/models/category-food';
import { CategoryFrequency } from 'src/app/models/category-frequency';
import { FoodItem } from 'src/app/models/food-item';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-restaurant-order-bottom',
  templateUrl: './restaurant-order-bottom.component.html',
  styleUrls: ['./restaurant-order-bottom.component.css'],
})
export class RestaurantOrderBottomComponent {
  restaurantId: number = 0;
  totalCartQuantity: number = 0;

  foodItems: FoodItem[] = [];
  categoryFrequency = new Map<string, number>();
  categoryFoodItem = new Map<string, FoodItem[]>();

  categories: CategoryFrequency[] = [];
  categoryFoodItems: CategoryFood[] = [];
  selectedCategory: any = null;

  searchInput: string = '';

  userId: number = 0;

  emptyList: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private foodService: FoodService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {
    this.restaurantId = this.activatedRoute.snapshot.params['restaurantId'];
    console.log(this.restaurantId);
    const id = sessionStorage.getItem('userId');
    this.userId = Number(id === null ? '' : id);
    this.getMenuItems();
    this.getCartItems();
  }

  onCategoryClick(category: any) {
    this.selectedCategory = category.split(' ').join('');
    console.log(this.selectedCategory);
    const myDiv = this.elementRef.nativeElement.querySelector(
      '#' + this.selectedCategory
    );
    myDiv.scrollIntoView();
  }

  getMenuItems() {
    this.foodService
      .getFoodItemsByRestaurantById(Number(this.restaurantId))
      .subscribe((data) => {
        this.foodItems = data;
        this.populateCategories();
      });
  }

  populateCategories() {
    console.log(this.foodItems);
    this.foodItems.forEach((foodItem) => {
      let category = foodItem.food.cuisine;
      if (this.categoryFrequency.has(category)) {
        let categoryValue = this.categoryFrequency.get(category);
        this.categoryFrequency.set(category, (categoryValue ?? 0) + 1);
      } else {
        this.categoryFrequency.set(category, 1);
      }
    });

    for (let [key, value] of this.categoryFrequency) {
      this.categories.push(new CategoryFrequency(key, value));
    }

    this.foodItems.forEach((foodItem) => {
      let category = foodItem.food.cuisine;
      if (this.categoryFoodItem.has(category)) {
        let oldValue: FoodItem[] = this.categoryFoodItem.get(category) ?? [];
        oldValue.push(foodItem);

        this.categoryFoodItem.set(category, oldValue);
      } else {
        let newValue: FoodItem[] = [];
        newValue.push(foodItem);
        this.categoryFoodItem.set(category, newValue);
      }
    });

    for (let [key, value] of this.categoryFoodItem) {
      this.categoryFoodItems.push(new CategoryFood(key, value));
    }

    console.log(this.categoryFoodItems);
  }

  onCartChange() {
    this.getCartItems();
  }

  getCartItems() {
    this.totalCartQuantity = 0;
    this.cartService.getCartItemsByUserId(this.userId).subscribe((data) => {
      data.forEach((cartItem) => {
        this.totalCartQuantity += cartItem.quantity;
      });
      console.log(this.totalCartQuantity);
    });
  }

  // onEmptyFoodItems(empty:boolean) {
  //   this.emptyList = empty;
  // }

  onSearchChange() {
    if (this.searchInput === '') {
      this.emptyList = false;
    }
  }
}
