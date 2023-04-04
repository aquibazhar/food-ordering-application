import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Coordinates } from 'src/app/models/coordinates';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.css'],
})
export class HomeCardsComponent {
  cards: string[] = ['', '', '', '', '', ''];
  restaurants: Restaurant[] = [];
  @Output() restaurantsFetched: EventEmitter<Restaurant[]> = new EventEmitter<
    Restaurant[]
  >();

  destinationLatitude: number = 23.4567; // destination latitude
  destinationLongitude: number = 89.0123; // destination longitude
  distance: number = 0;

  restaurantDistanceMap: Map<number, number> = new Map<number, number>();

  latitude: number;
  longitude: number;

  constructor(private restaurantService: RestaurantService) {
    this.latitude = 0;
    this.longitude = 0;
    const savedCoords = sessionStorage.getItem('coordinates');
    if (savedCoords === null) {
      this.detectLocation();
    } else {
      const coordinates: Coordinates = JSON.parse(savedCoords);
      this.latitude = coordinates.latitude;
      this.longitude = coordinates.longitude;
      // this.getNearbyRestaurants();
      this.getAllRestaurants();
    }
  }

  detectLocation() {
    if (!navigator.geolocation) {
      console.log('Not Supported');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      this.longitude = position.coords.longitude;
      this.latitude = position.coords.latitude;
      let coordinates: Coordinates = new Coordinates(
        this.latitude,
        this.longitude
      );
      sessionStorage.setItem('coordinates', JSON.stringify(coordinates));
      // this.getNearbyRestaurants();
      this.getAllRestaurants();
    });
  }

  // getNearbyRestaurants() {
  //   this.restaurantService
  //     .getNearByRestaurants(this.latitude, this.longitude)
  //     .subscribe((data) => {
  //       this.restaurants = data;
  //       this.restaurantsFetched.emit(this.restaurants);
  //       this.restaurants.forEach((restaurant) => {
  //         this.destinationLatitude = restaurant.address.latitude;
  //         this.destinationLongitude = restaurant.address.longitude;
  //         this.restaurantDistanceMap.set(
  //           restaurant.id,

  //           this.calculateEstimatedTime()
  //         );
  //       });
  //     });
  // }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      this.filterNearbyRestaurants();
      this.restaurants.forEach((restaurant) => {
        this.destinationLatitude = restaurant.address.latitude;
        this.destinationLongitude = restaurant.address.longitude;
        this.restaurantDistanceMap.set(
          restaurant.id,

          this.calculateEstimatedTime() + 15
        );
      });
    });
  }

  filterNearbyRestaurants() {
    this.restaurants = this.restaurants.filter((restaurant) => {
      const estimatedDistance = this.restaurantService.calculateDistance(
        this.latitude,
        this.longitude,
        restaurant.address.latitude,
        restaurant.address.longitude
      );

      // SET THIS TO <20
      return estimatedDistance < 20 && restaurant.approvalStatus;
    });
    this.restaurantsFetched.emit(this.restaurants);
  }

  calculateEstimatedTime() {
    return this.restaurantService.calculateEstimatedTime(
      this.latitude,
      this.longitude,
      this.destinationLatitude,
      this.destinationLongitude
    );
  }
}
