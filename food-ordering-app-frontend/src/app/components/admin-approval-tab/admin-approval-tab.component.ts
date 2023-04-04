import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-admin-approval-tab',
  templateUrl: './admin-approval-tab.component.html',
  styleUrls: ['./admin-approval-tab.component.css'],
})
export class AdminApprovalTabComponent {
  @Input() restaurants: Restaurant[] = [];
  @Output() onApproval: EventEmitter<number> = new EventEmitter<number>();

  constructor(private restaurantService: RestaurantService) {}

  onApprove(restaurantId: number) {
    this.onApproval.emit(restaurantId);
  }
}
