import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/credentials';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  loginAdmin(credentials: Credentials): Observable<string> {
    return this.http
      .post(environment.BASE_URL + 'admin' + '/login', credentials, {
        responseType: 'text',
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  showAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      environment.BASE_URL + 'admin' + '/showRestaurants'
    );
  }

  changeApprovalStatus(restaurantId: number): Observable<string> {
    return this.http.patch(
      environment.BASE_URL +
        'admin' +
        '/changeApprovalStatus?restaurantId=' +
        restaurantId,
      null,
      {
        responseType: 'text',
      }
    );
  }

  deleteRestaurantById(restaurantId: number): Observable<string> {
    return this.http.delete<string>(
      environment.BASE_URL +
        'admin' +
        '/deleteRestaurant?restaurantId=' +
        restaurantId
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    // Return an observable with a user-facing error message.
    if (error.status === 401) {
      return throwError(() => new Error('Invalid Username or Password'));
    } else {
      return throwError(
        () => new Error('Something went bad ! Please try again after sometime')
      );
    }
    // Return an observable with a user-facing error message.
    if (error.status === 409) {
      return throwError(
        () => new Error('You have already added this city to watchlist')
      );
    } else {
      return throwError(
        () => new Error('Something went bad ! Please try again after sometime')
      );
    }
  }
}
