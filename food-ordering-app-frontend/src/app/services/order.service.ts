import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      environment.BASE_URL + 'order' + '/placeOrder',
      order
    );
  }

  createTransaction(amount: number) {
    return this.http.get(
      environment.BASE_URL + 'order' + '/createTransaction/' + amount
    );
  }

  cancelOrder(id: number): Observable<string> {
    return this.http.delete(
      environment.BASE_URL + 'order' + '/cancelOrder?id=' + id,
      {
        responseType: 'text',
      }
    );
  }

  updateOrderStatus(id: number, status: string): Observable<Order> {
    return this.http.patch<Order>(
      environment.BASE_URL +
        'order' +
        '/updateOrderStatus?id=' +
        id +
        '&status=' +
        status,
      null
    );
  }

  getUserOrder(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      environment.BASE_URL + 'order' + '/getUsersOrder?userId=' + userId
    );
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(
      environment.BASE_URL + 'order' + '/getOrderById?orderId=' + orderId
    );
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      environment.BASE_URL + 'order' + '/getAllOrders'
    );
  }

  getOrdersOfARestaurants(restaurantId: number): Observable<any> {
    return this.http.get<any>(
      environment.BASE_URL +
        'order' +
        '/getOrdersOfARestaurants?restaurantId=' +
        restaurantId
    );
  }
}
