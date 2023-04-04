import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  public addCartItem(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(
      environment.BASE_URL + 'cart' + '/addToCart',
      cart
    );
  }
  public updateCartItem(cart: Cart): Observable<Cart> {
    return this.http.patch<Cart>(
      environment.BASE_URL + 'cart' + '/updateCartItem',
      cart
    );
  }
  public deleteCartItem(cartId: number): Observable<string> {
    const params = new HttpParams().set('cartId', cartId);
    return this.http.delete(environment.BASE_URL + 'cart' + '/deleteCartItem', {
      params,
      responseType: 'text',
    });
  }
  public getCartItemsByUserId(userId: number): Observable<Cart[]> {
    const params = new HttpParams().set('userId', userId);
    return this.http.get<Cart[]>(
      environment.BASE_URL + 'cart' + '/getCartItemsByUserId',
      {
        params,
      }
    );
  }
}
