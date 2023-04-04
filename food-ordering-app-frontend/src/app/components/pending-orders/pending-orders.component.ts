import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FoodCart } from 'src/app/models/food-cart';
import { Order } from 'src/app/models/order';
import { OrderUser } from 'src/app/models/order-user';
import { Restaurant } from 'src/app/models/restaurant';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css'],
})
export class PendingOrdersComponent {
  selectedValue = 'Ordered';

  orderStatus: string[] = ['Preparing', 'Picked', 'Delivered'];

  orders: any;

  userEmail: string;
  restaurantId: number = 0;

  combinedFoodCart: FoodCart[] = [];

  combinedOrderUser: OrderUser[] = [];

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private foodService: FoodService,
    private _snackBar: MatSnackBar,
    private restaurantService: RestaurantService
  ) {
    const email = sessionStorage.getItem('email');
    this.userEmail = email === null ? '' : email;
    this.getRestaurantDetails();
  }

  getOrderDetails() {
    this.orderService
      .getOrdersOfARestaurants(this.restaurantId)
      .subscribe((data) => {
        console.log(data);
        this.orders = data;
      });
  }

  getRestaurantDetails() {
    this.restaurantService
      .getRestaurantByEmail(this.userEmail)
      .subscribe((data) => {
        this.restaurantId = data.id;
        this.getOrderDetails();
      });
  }

  changeOrderStatus(orderId: number, status: string) {
    console.log(orderId);
    console.log(status);
    this.orderService
      .updateOrderStatus(orderId, status.trim())
      .subscribe((data) => {
        this.openSnackBar('Order status updated successfully', 'OK');
        this.getOrderDetails();
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
