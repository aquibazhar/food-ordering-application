import { Component } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent {
  userId: number = 0;
  orders: any;

  constructor(private orderService: OrderService) {
    const userId = sessionStorage.getItem('userId');
    this.userId = Number(userId === null ? '' : userId);
    console.log(this.userId);
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.orderService.getUserOrder(this.userId).subscribe((data) => {
      this.orders = data;
      console.log(this.orders);
    });
  }
}
