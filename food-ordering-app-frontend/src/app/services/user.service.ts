import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';

import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  pipe,
  retry,
  throwError,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../models/change-password';
import { Credentials } from '../models/credentials';
import { User } from '../models/user';
import { UserAddress } from '../models/user-address';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLoggedInSubject;
  isLoggedIn;

  constructor(private http: HttpClient) {
    if (sessionStorage.getItem('email') !== null) {
      this.isLoggedInSubject = new BehaviorSubject<boolean>(true);
    } else {
      this.isLoggedInSubject = new BehaviorSubject<boolean>(false);
    }
    this.isLoggedIn = this.isLoggedInSubject.asObservable();
  }

  registerUser(user: User): Observable<string> {
    return this.http
      .post(environment.BASE_URL + 'user' + '/register', user, {
        responseType: 'text',
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  loginUser(credentials: Credentials): Observable<string> {
    return this.http
      .post(environment.BASE_URL + 'user' + '/login', credentials, {
        responseType: 'text',
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  changePassword(changedPassword: ChangePassword): Observable<string> {
    return this.http
      .patch(
        environment.BASE_URL + 'user' + '/changePassword',
        changedPassword,
        {
          responseType: 'text',
        }
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(environment.BASE_URL + 'user' + '/' + email);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(
      environment.BASE_URL + 'user' + '/getByUserId/' + userId
    );
  }

  getAddressByEmail(email: string): Observable<UserAddress[]> {
    const params = new HttpParams().set('email', email);
    return this.http.get<UserAddress[]>(
      environment.BASE_URL + 'user' + '/getAddress',
      {
        params,
      }
    );
  }

  getAddressById(addressId: number): Observable<UserAddress> {
    const params = new HttpParams().set('addressId', addressId);
    return this.http.get<UserAddress>(
      environment.BASE_URL + 'user' + '/getAddressById',
      {
        params,
      }
    );
  }

  addNewAddress(userAddress: UserAddress): Observable<UserAddress> {
    return this.http.post<UserAddress>(
      environment.BASE_URL + 'user' + '/addAddress',
      userAddress
    );
  }

  updateUserRole(email: string): Observable<string> {
    const params = new HttpParams().set('email', email);
    return this.http.patch(
      environment.BASE_URL + 'user' + '/updateRole',
      null,
      {
        params,
        responseType: 'text',
      }
    );
  }

  updateProfile(updatedUser: User): Observable<User> {
    return this.http.put<User>(
      environment.BASE_URL + 'user' + '/updateProfile',
      updatedUser
    );
  }

  deleteUserById(addressId: number): Observable<string> {
    return this.http.delete(
      environment.BASE_URL + 'user' + '/deleteAddressById/' + addressId,
      {
        responseType: 'text',
      }
    );
  }

  updateAddress(address: UserAddress): Observable<UserAddress> {
    return this.http.put<UserAddress>(
      environment.BASE_URL + 'user' + '/changeAddress',
      address
    );
  }

  login(email: string, message: string) {
    if (message === 'User logged in successfully') {
      this.http
        .get<User>(environment.BASE_URL + 'user' + '/' + email)
        .subscribe((data) => {
          console.log(data);
          sessionStorage.setItem('userId', data.id.toString());
          sessionStorage.setItem('fullName', data.fullName.toString());
          sessionStorage.setItem('role', data.role.toString());
        });
      sessionStorage.setItem('email', email);
      this.isLoggedInSubject.next(true);
    }
  }

  logout(): Observable<string> {
    const email = sessionStorage.getItem('email');

    return this.http.patch(
      environment.BASE_URL + 'user' + '/logout/' + email,
      null,
      {
        responseType: 'text',
      }
    );
  }

  updateLogout() {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('fullName');
    sessionStorage.removeItem('role');
    this.isLoggedInSubject.next(false);
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
