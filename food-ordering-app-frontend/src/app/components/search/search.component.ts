import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Coordinates } from 'src/app/models/coordinates';
import { FoodItem } from 'src/app/models/food-item';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import { UserAddress } from 'src/app/models/user-address';
import { FoodService } from 'src/app/services/food.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  userAddress: UserAddress = {} as UserAddress;
  email: string;
  searchInput: string = '';
  nearbyRestaurants: Restaurant[] = [];
  filteredNearbyRestaurants: Restaurant[] = [];
  foundRestaurantIds: number[] = [];

  foodItems: FoodItem[] = [];

  loadingFlag: boolean = true;

  destinationLatitude: number = 23.4567; // destination latitude
  destinationLongitude: number = 89.0123; // destination longitude
  distance: number = 0;

  latitude: number;
  longitude: number;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.latitude = 0;
    this.longitude = 0;

    const email = sessionStorage.getItem('email');
    this.email = email === null ? '' : email;

    this.searchInput = this.activatedRoute.snapshot.params['searchInput'];

    this.getUserAddress();

    let savedCoords = sessionStorage.getItem('coordinates');

    if (savedCoords !== null) {
      let coordinates: Coordinates = JSON.parse(savedCoords);
      this.latitude = coordinates.latitude;
      this.longitude = coordinates.longitude;
      this.searchFoodItems();
      // this.getNearbyRestaurants();
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.searchInput = this.activatedRoute.snapshot.params['searchInput'];
        this.nearbyRestaurants = [];
        this.foundRestaurantIds = [];

        this.foodItems = [];
        if (savedCoords !== null) {
          let coordinates: Coordinates = JSON.parse(savedCoords);
          this.latitude = coordinates.latitude;
          this.longitude = coordinates.longitude;
          this.searchFoodItems();
          // this.getNearbyRestaurants();
        }
      }
    });
  }

  getUserAddress() {
    this.userService.getAddressByEmail(this.email).subscribe((data) => {
      this.userAddress = data[0];
    });
  }

  searchFoodItems() {
    this.foodService
      .getFoodItemsByFoodName(this.searchInput)
      .subscribe((data) => {
        this.foodItems = data;
        this.foodItems.forEach((foodItem) => {
          this.foundRestaurantIds.push(foodItem.restaurantId);
        });
        if (this.foundRestaurantIds.length !== 0) {
        }
        this.getAllRestaurants();
        console.log(this.foodItems);
      });
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.nearbyRestaurants = data;
      this.filterNearbyRestaurants();
      this.filterBySearch();
    });
  }

  calculateEstimatedTime() {
    return this.restaurantService.calculateEstimatedTime(
      this.latitude,
      this.longitude,
      this.destinationLatitude,
      this.destinationLongitude
    );
  }

  filterNearbyRestaurants() {
    this.nearbyRestaurants = this.nearbyRestaurants.filter((restaurant) => {
      const estimatedDistance = this.restaurantService.calculateDistance(
        this.latitude,
        this.longitude,
        restaurant.address.latitude,
        restaurant.address.longitude
      );
      // SET THIS TO <20
      return estimatedDistance < 20 && restaurant.approvalStatus;
    });
  }

  filterBySearch() {
    this.filteredNearbyRestaurants = this.nearbyRestaurants.filter(
      (nearbyRestaurant) => {
        return this.foundRestaurantIds.includes(nearbyRestaurant.id);
      }
    );
    this.loadingFlag = false;
  }
}
