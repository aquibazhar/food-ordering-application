import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-order-page',
  templateUrl: './restaurant-order-page.component.html',
  styleUrls: ['./restaurant-order-page.component.css'],
})
export class RestaurantOrderPageComponent {
  userEmail: string;
  restaurant: Restaurant = {} as Restaurant;
  restaurantId: number;
  dataFetched: boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private activatedRoute: ActivatedRoute
  ) {
    const email = sessionStorage.getItem('email');
    this.userEmail = email === null ? '' : email;
    this.restaurantId = Number(
      this.activatedRoute.snapshot.params['restaurantId']
    );
    console.log(this.restaurantId);

    this.getRestaurantDetails();
  }

  getRestaurantDetails() {
    this.restaurantService
      .getRestaurantById(this.restaurantId)
      .subscribe((data) => {
        this.restaurant = data;
        console.log(data);
        this.dataFetched = true;
      });
  }
}
