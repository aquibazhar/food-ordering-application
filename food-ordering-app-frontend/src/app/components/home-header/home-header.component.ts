import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FoodItem } from 'src/app/models/food-item';
import { Restaurant } from 'src/app/models/restaurant';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { AddAddressComponent } from '../add-address/add-address.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css'],
})
export class HomeHeaderComponent {
  isLoggedIn: boolean = false;
  myControl = new FormControl('');

  foodItemOptions: FoodItem[] = [];
  @Input() restaurantOptions: Restaurant[] = [];

  filteredFoodOptions: Observable<FoodItem[]>;
  filteredRestaurantOptions: Observable<Restaurant[]>;

  fullName: string = '';
  role: string = '';

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private foodService: FoodService
  ) {
    console.log(this.restaurantOptions);
    this.filteredFoodOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.foodFilter(value || ''))
    );
    this.filteredRestaurantOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.restaurantFilter(value || ''))
    );
    // this.userService.isLoggedIn.subscribe(
    //   (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    // );
    this.updateLoginStatus();
    if (this.isLoggedIn) {
      const fullName = sessionStorage.getItem('fullName');
      this.fullName = fullName === null ? '' : fullName;

      const role = sessionStorage.getItem('role');
      this.role = role === null ? '' : role;
    }
    this.getFoodItems();
  }

  private foodFilter(value: string): FoodItem[] {
    const filterValue = value.toLowerCase();

    return this.foodItemOptions.filter((foodItem: FoodItem) =>
      foodItem.food.foodName.toLowerCase().includes(filterValue)
    );
  }

  private restaurantFilter(value: string): Restaurant[] {
    const filterValue = value.toLowerCase();

    return this.restaurantOptions.filter(
      (restaurant: Restaurant) =>
        restaurant.description.toLowerCase().includes(filterValue) ||
        restaurant.name.toLowerCase().includes(filterValue)
    );
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.updateLoginStatus();
    });
  }

  openSigninDialog() {
    const dialogRef = this.dialog.open(SignInComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.updateLoginStatus();

      if (this.isLoggedIn) {
        const fullName = sessionStorage.getItem('fullName');
        this.fullName = fullName === null ? '' : fullName;

        const role = sessionStorage.getItem('role');
        this.role = role === null ? '' : role;
      }
    });
  }

  logout() {
    this.userService.logout().subscribe((data) => {
      this.openSnackBar(data, 'OK');
      this.userService.updateLogout();
    });
    this.updateLoginStatus();
  }

  updateLoginStatus() {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  getFoodItems() {
    this.foodService.getAllFoodItems().subscribe((data) => {
      this.foodItemOptions = data;
      console.log(data);
      this.filterNearestFoodItem();
    });
  }
  filterNearestFoodItem() {
    this.foodItemOptions = this.foodItemOptions.filter((foodItem) =>
      this.restaurantOptions.some(
        (restaurant) => restaurant.id === foodItem.restaurantId
      )
    );
  }
}
