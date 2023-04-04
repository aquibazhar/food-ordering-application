import { Component, Input } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-restaurant-dashboard-top',
  templateUrl: './restaurant-dashboard-top.component.html',
  styleUrls: ['./restaurant-dashboard-top.component.css'],
})
export class RestaurantDashboardTopComponent {
  @Input() restaurant: Restaurant = {} as Restaurant;
  @Input() parentComponent: string = 'order-page';
}
