import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Coordinates } from 'src/app/models/coordinates';
import { FoodCart } from 'src/app/models/food-cart';
import { Order } from 'src/app/models/order';
import { Restaurant } from 'src/app/models/restaurant';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
declare const L: any;
@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css'],
})
export class OrderStatusComponent implements OnInit {
  longitude: number = 0;
  latitude: number = 0;
  seconds: number = 10;
  orderId: number = 0;
  restaurantId: number = 0;
  order: Order = {} as Order;
  restaurant: Restaurant = {} as Restaurant;
  estimatedTime: number = 0;

  combinedFoodCart: FoodCart[] = [];
  restaurantLatitude: number = 0;
  restaurantLongitude: number = 0;

  redirectingIn: number = 10 * 100;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private restaurantService: RestaurantService,
    private router: Router
  ) {
    this.orderId = Number(this.activatedRoute.snapshot.params['orderId']);
    this.getOrderDetails();
  }

  ngOnInit(): void {
    // this.startTimer();
  }

  showMap() {
    let map = L.map('map').setView([this.latitude, this.longitude], 18);

    let marker = L.marker([this.latitude, this.longitude]).addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    marker.bindPopup(this.restaurant.name).openPopup();
    // marker.on('dragend', (event: any) => {
    //   const marker = event.target;
    //   const position = marker.getLatLng();
    //   this.latitude = position.lat;
    //   this.longitude = position.lng;
    // });
  }

  startTimer() {
    let timer = setInterval(() => {
      // after every 1000 milliseconds callback function will be called. and clearInterval will cancel the timer
      this.seconds--;
      if (this.seconds == 0) {
        clearInterval(timer);
        location.reload();
      }
    }, 1000);
  }

  getOrderDetails() {
    this.orderService.getOrderById(this.orderId).subscribe((data) => {
      this.order = data;
      this.mapCartItems();
      // console.log(this.order);
      this.startRedirectTimer();
    });
  }

  mapCartItems() {
    this.order.orderItems.forEach((orderItem) => {
      this.foodService
        .getSpecificFoodItem(orderItem.foodItemId)
        .subscribe((data) => {
          this.restaurantId = data.restaurantId;
          this.fetchRestaurantDetails();

          this.combinedFoodCart.push(
            new FoodCart(orderItem.id, data, orderItem.quantity)
          );

          // console.log(this.combinedFoodCart);
        });
    });
  }

  fetchRestaurantDetails() {
    this.restaurantService
      .getRestaurantById(this.restaurantId)
      .subscribe((data) => {
        this.restaurant = data;
        this.restaurantLatitude = this.restaurant.address.latitude;
        this.restaurantLongitude = this.restaurant.address.longitude;
        const savedCoords = sessionStorage.getItem('coordinates');
        if (savedCoords !== null) {
          const coordinates: Coordinates = JSON.parse(savedCoords);
          this.latitude = coordinates.latitude;
          this.longitude = coordinates.longitude;
        }
        this.estimatedTime = this.restaurantService.calculateEstimatedTime(
          this.latitude,
          this.longitude,
          this.restaurantLatitude,
          this.restaurantLongitude
        );
        this.showMap();
      });
  }

  startRedirectTimer() {
    if (this.order.orderStatus === 'Delivered') {
      let timer = setInterval(() => {
        this.redirectingIn = this.redirectingIn - 1;
        if (this.redirectingIn === 900) {
          this.router.navigateByUrl('/home');
        }
      }, 100);
    }
  }

  timeTransform(time: number) {
    if ((time / 10) % 10 > 9) {
      return 10;
    }
    return Math.ceil(time / 10) % 10;
  }
}
