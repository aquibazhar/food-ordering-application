import { Component } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  username: string = '';
  isLoggedIn: boolean = false;
  restaurants: Restaurant[] = [];
  loadingFlag: boolean = true;

  constructor(private userService: UserService) {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );

    if (this.isLoggedIn) {
      const userId = sessionStorage.getItem('username');
      this.username = userId !== null ? userId : '';
    }
  }

  onRestaurantsFetched(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
    this.loadingFlag = false;
  }
}
