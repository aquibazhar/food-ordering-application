import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FoodItem } from '../models/food-item';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  constructor(private http: HttpClient) {}

  addFoodItem(foodItem: FoodItem) {
    return this.http.post<FoodItem>(
      environment.BASE_URL + 'foodItem' + '/addFoodItem',
      foodItem
    );
  }

  getFoodItemsByRestaurantById(restaurantId: number): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(
      environment.BASE_URL +
        'foodItem' +
        '/getAllByRestaurantId/' +
        restaurantId
    );
  }

  getFoodItemsByFoodName(foodName: string): Observable<FoodItem[]> {
    const params = new HttpParams().set('foodName', foodName);
    return this.http.get<FoodItem[]>(
      environment.BASE_URL + 'foodItem' + '/getFoodByName',
      {
        params,
      }
    );
  }

  getDistinctFoodName(): Observable<string[]> {
    return this.http.get<string[]>(
      environment.BASE_URL + 'foodItem' + '/getDistinctFoodName'
    );
  }

  getFoodByMealType(mealType: string) {
    const params = new HttpParams().set('mealType', mealType);
    return this.http.get(
      environment.BASE_URL + 'foodItem' + '/getFoodByMealType',
      {
        params,
      }
    );
  }

  getAllFoodItems(): Observable<FoodItem[]> {
    return this.http.get<FoodItem[]>(
      environment.BASE_URL + 'foodItem' + '/getAllFoodItems'
    );
  }

  getFoodByCuisineType(cuisine: string): Observable<FoodItem[]> {
    const params = new HttpParams().set('cuisineType', cuisine);
    return this.http.get<FoodItem[]>(
      environment.BASE_URL + 'foodItem' + '/getFoodByCuisineType',
      {
        params,
      }
    );
  }

  public addMultipleFoodItem(food: any) {
    return this.http.post(
      environment.BASE_URL + 'foodItem' + '/getFoodByMealType',
      food
    );
  }
  public getSpecificFoodItem(id: number): Observable<FoodItem> {
    const params = new HttpParams().set('id', id);
    return this.http.get<FoodItem>(
      environment.BASE_URL + 'foodItem' + '/getSpecificFoodItem',
      {
        params,
      }
    );
  }
  public updateFoodItem(food: any) {
    return this.http.put(
      environment.BASE_URL + 'foodItem' + '/updateFoodItem',
      food
    );
  }
  public deleteFoodItemById(id: number): Observable<string> {
    const params = new HttpParams().set('id', id);
    return this.http.delete(
      environment.BASE_URL + 'foodItem' + '/deleteFoodItemById',
      {
        params,
        responseType: 'text',
      }
    );
  }
}
