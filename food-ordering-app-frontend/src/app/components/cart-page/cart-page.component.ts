import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Coordinates } from 'src/app/models/coordinates';
import { FoodCart } from 'src/app/models/food-cart';

import { CartService } from 'src/app/services/cart.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  userId: number;
  cartItems: Cart[] = [];
  dataFetched: boolean;
  restaurantId: number;
  combinedFoodCart: FoodCart[] = [];

  totalCost: number = 0;

  latitude: number;
  longitude: number;
  restaurantLatitude: number;
  restaurantLongitude: number;

  estimatedTime: number = 0;

  estimatedDistance: number = 0;

  constructor(
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {
    const id = sessionStorage.getItem('userId');
    this.restaurantId = this.activatedRoute.snapshot.params['restaurantId'];
    this.userId = Number(id === null ? '' : id);
    this.getCartItems();
    this.dataFetched = false;

    this.restaurantLatitude = 0;
    this.restaurantLongitude = 0;

    this.latitude = 0;
    this.longitude = 0;

    const savedCoords = sessionStorage.getItem('coordinates');
    if (savedCoords !== null) {
      const coordinates: Coordinates = JSON.parse(savedCoords);
      this.latitude = coordinates.latitude;
      this.longitude = coordinates.longitude;
      this.getRestaurantDetails();
    }
  }

  getCartItems() {
    this.cartService.getCartItemsByUserId(this.userId).subscribe((data) => {
      this.cartItems = data;
      this.dataFetched = true;
    });
  }

  getRestaurantDetails() {
    this.restaurantService
      .getRestaurantById(this.restaurantId)
      .subscribe((data) => {
        this.restaurantLatitude = data.address.latitude;
        this.restaurantLongitude = data.address.longitude;

        this.estimatedTime = this.restaurantService.calculateEstimatedTime(
          this.latitude,
          this.longitude,
          this.restaurantLatitude,
          this.restaurantLongitude
        );

        this.estimatedDistance = this.restaurantService.calculateDistance(
          this.latitude,
          this.longitude,
          this.restaurantLatitude,
          this.restaurantLongitude
        );
      });
  }

  onCartChange() {}

  totalCostCalculated(totalCost: number) {
    this.totalCost = totalCost;
  }

  foodCartItems(combinedFoodCart: FoodCart[]) {
    this.combinedFoodCart = combinedFoodCart;
  }
}
