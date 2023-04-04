import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER, V } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodItemImage } from 'src/app/models/food-item-image';
import { FoodItem } from 'src/app/models/food-item';
import { Food } from 'src/app/models/food';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-add-restaurant-form-three',
  templateUrl: './add-restaurant-form-three.component.html',
  styleUrls: ['./add-restaurant-form-three.component.css'],
})
export class AddRestaurantFormThreeComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  restaurant: Restaurant = {} as Restaurant;

  foodItems: FoodItem[] = [];
  @Input() parentComponent: string = 'form-three';

  mealTypes: string[] = ['Vegetarian', 'Non-Vegetarian'];
  foodItemForm: FormGroup;
  image: FoodItemImage;
  userEmail: string;

  @Input() categories: string[] = [];
  @Input() restaurantId: number = 0;

  constructor(
    private builder: FormBuilder,
    private _snackBar: MatSnackBar,
    private foodService: FoodService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    const email = sessionStorage.getItem('email');
    this.userEmail = email === null ? '' : email;

    this.image = new FoodItemImage(0, '', '');
    this.foodItemForm = this.builder.group({
      foodName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      mealType: ['', [Validators.required]],
      price: [
        '',
        [Validators.required, Validators.pattern(/^(0|[1-9]\d*)(\.\d+)?$/)],
      ],
      description: ['', [Validators.required]],
    });

    this.getRestaurantDetails();
    this.getAllFoodItems();
  }

  addFoodItem() {
    if (this.image.image === '') {
      this.openSnackBar('Please select an image for the food item', 'OK');
      return;
    }
    let food: Food = new Food(
      0,
      this.foodItemForm.value.foodName,
      this.foodItemForm.value.category,
      this.foodItemForm.value.mealType
    );

    let foodItem: FoodItem = new FoodItem(
      0,
      this.foodItemForm.value.price,
      this.foodItemForm.value.description,
      this.restaurantId,
      food,
      this.image
    );

    this.foodService.addFoodItem(foodItem).subscribe((data) => {
      this.foodItems.push(data);
      console.log(this.foodItems);
      this.openSnackBar('Food Item Added successfully', 'OK');
      this.foodItemForm.reset();
      this.foodItemForm.clearValidators();
      this.image = {} as FoodItemImage;
    });
  }

  onImageUpload(image: FoodItemImage) {
    this.image = image;
    console.log(this.image);
    this.openSnackBar('Image uploaded successfully', 'OK');
  }

  // add(event: MatChipInputEvent): void {
  //   const value = (event.value || '').trim().toLowerCase();

  //   // Add our tag
  //   if (value) {
  //     this.cuisines.push(value);
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();
  // }

  // remove(tag: string): void {
  //   const index = this.cuisines.indexOf(tag);

  //   if (index >= 0) {
  //     this.cuisines.splice(index, 1);
  //   }
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  onDelete(id: any) {
    this.foodService.deleteFoodItemById(id).subscribe((data) => {
      this.openSnackBar(data, 'OK');
      this.getAllFoodItems();
    });
  }

  getAllFoodItems() {
    this.restaurantService
      .getRestaurantByEmail(this.userEmail)
      .subscribe((data) => {
        this.foodService
          .getFoodItemsByRestaurantById(data.id)
          .subscribe((data) => {
            console.log(data);
            this.foodItems = data;
          });
      });
  }

  getRestaurantDetails() {
    this.restaurantService
      .getRestaurantByEmail(this.userEmail)
      .subscribe((data) => {
        this.restaurant = data;
        this.categories = data.description.split('  ');
      });
  }

  onEmptyList() {
    this.foodItems = [];
  }

  changeParentValue() {
    this.parentComponent = 'form-three';
  }

  onSubmit() {
    if (this.parentComponent === 'form-three') {
      this.router.navigateByUrl('/partner-with-us/restaurant-dashboard');
    }
    this.parentComponent = 'dashboard';
  }
}
