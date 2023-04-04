import { Component } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-dashboard',
  templateUrl: './restaurant-dashboard.component.html',
  styleUrls: ['./restaurant-dashboard.component.css'],
})
export class RestaurantDashboardComponent {
  userEmail: string;
  restaurant: Restaurant = {} as Restaurant;

  constructor(private restaurantService: RestaurantService) {
    const email = sessionStorage.getItem('email');
    this.userEmail = email === null ? '' : email;
    this.getRestaurantDetails();
  }

  getRestaurantDetails() {
    this.restaurantService
      .getRestaurantByEmail(this.userEmail)
      .subscribe((data) => {
        this.restaurant = data;
        console.log(data);
      });
  }
}
