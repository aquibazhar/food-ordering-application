import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-admin-manage-tab',
  templateUrl: './admin-manage-tab.component.html',
  styleUrls: ['./admin-manage-tab.component.css'],
})
export class AdminManageTabComponent {
  @Input() restaurants: Restaurant[] = [];
  @Output() unlist: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  onUnlist(restaurantId: number) {
    this.unlist.emit(restaurantId);
  }
}
