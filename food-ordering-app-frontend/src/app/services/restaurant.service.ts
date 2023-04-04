import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  register(restaurant: Restaurant): Observable<string> {
    return this.http.post(
      environment.BASE_URL + 'restaurant' + '/register',
      restaurant,
      {
        responseType: 'text',
      }
    );
  }

  public getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      environment.BASE_URL + 'restaurant' + '/' + id
    );
  }
  public getRestaurantByEmail(email: string): Observable<Restaurant> {
    const params = new HttpParams().set('email', email);
    return this.http.get<Restaurant>(
      environment.BASE_URL + 'restaurant' + '/email',
      {
        params,
      }
    );
  }
  public getRestaurantsInACity(city: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      environment.BASE_URL + 'restaurant' + '/getRestaurantInACity' + city
    );
  }
  public getNearByRestaurants(
    latitude: number,
    longitude: number
  ): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      environment.BASE_URL +
        'restaurant' +
        `/getNearByRestaurants?latitude=${latitude}&longitude=${longitude}`
    );
  }

  public getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      environment.BASE_URL + 'restaurant' + '/getAllRestaurants'
    );
  }

  calculateDistance(
    latitude: number,
    longitude: number,
    destinationLatitude: number,
    destinationLongitude: number
  ): number {
    const R = 6371; // mean radius of Earth in km
    const dLat = this.deg2rad(destinationLatitude - latitude);
    const dLon = this.deg2rad(destinationLongitude - longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitude)) *
        Math.cos(this.deg2rad(destinationLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // console.log(R * c);
    return R * c;
  }

  calculateEstimatedTime(
    latitude: number,
    longitude: number,
    destinationLatitude: number,
    destinationLongitude: number
  ) {
    let emstimatedTime =
      Math.round(
        this.calculateDistance(
          latitude,
          longitude,
          destinationLatitude,
          destinationLongitude
        )
      ) * 2;
    if (emstimatedTime < 1) {
      return 1;
    }
    return emstimatedTime;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
