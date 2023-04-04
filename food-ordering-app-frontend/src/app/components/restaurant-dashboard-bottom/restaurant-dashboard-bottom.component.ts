import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurant-dashboard-bottom',
  templateUrl: './restaurant-dashboard-bottom.component.html',
  styleUrls: ['./restaurant-dashboard-bottom.component.css'],
})
export class RestaurantDashboardBottomComponent {
  listItems: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
    'abc',
    'cde',
    'asdasd',
    'asdasdas',
    'de2daw',
    '12sdas',
  ];
  selectedItem: any = null;

  searchInput: string = '';

  onItemClick(item: any) {
    this.selectedItem = item;
  }
}
