import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantAddress } from 'src/app/models/restaurant-address';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css'],
})
export class AddRestaurantComponent {
  selectedTab = 0;
  isLoggedIn: boolean = false;

  formOneValid: boolean = false;
  restaurantFormOneAddress!: FormGroup;
  restaurantFormOneContact!: FormGroup;
  timingsForm!: FormGroup;

  userEmail: string;
  fullName: string;
  categories: string[] = [];

  restaurantId: number = 0;

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private restaurantService: RestaurantService,
    private datePipe: DatePipe
  ) {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
    this.updateLoginStatus();

    const email = sessionStorage.getItem('email');
    this.userEmail = email === null ? '' : email;
    const fullName = sessionStorage.getItem('fullName');
    this.fullName = fullName === null ? '' : fullName;
  }

  logout() {
    this.userService.logout();
    this.updateLoginStatus();
  }

  updateLoginStatus() {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  nextTab() {
    if (this.selectedTab <= 2) {
      this.selectedTab += 1;
    }
  }

  previousTab() {
    if (this.selectedTab >= 0) {
      this.selectedTab -= 1;
    }
  }

  onFormOneValid(event: any) {
    this.formOneValid = event;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  onFormOne(restaurantFormOne: any) {
    this.restaurantFormOneAddress = restaurantFormOne;
    this.nextTab();
    this.openSnackBar('Restaurant details updated successfully', 'OK');
  }

  onFormTwo(restaurantFormContact: any) {
    this.restaurantFormOneContact = restaurantFormContact;
  }

  onFormTwoValid(event: any) {
    console.log(event);
  }

  onFinalSubmit(timingsForm: any) {
    // const opensAt = timingsForm.value.opensAt;
    // const closesAt = timingsForm.value.closesAt;

    this.timingsForm = timingsForm;

    console.log(this.timingsForm);
    if (
      this.timingsForm.valid &&
      this.restaurantFormOneAddress.valid &&
      this.restaurantFormOneContact.valid
    ) {
      const restaurantAddress: RestaurantAddress = new RestaurantAddress(
        0,
        this.restaurantFormOneAddress.value.city,
        this.restaurantFormOneAddress.value.state,
        this.restaurantFormOneAddress.value.pincode,
        this.restaurantFormOneAddress.value.houseNumber,
        this.restaurantFormOneAddress.value.locality,
        this.restaurantFormOneAddress.value.latitude,
        this.restaurantFormOneAddress.value.longitude
      );
      this.categories = this.timingsForm.value.cuisineTypes;
      const restaurant: Restaurant = new Restaurant(
        0,
        this.restaurantFormOneAddress.value.name,
        this.restaurantFormOneContact.value.mobileNumber,
        this.timingsForm.value.cuisineTypes.join('  '),
        this.userEmail,
        this.convertTime(timingsForm.value.opensAt),
        this.convertTime(timingsForm.value.closesAt),
        restaurantAddress,
        false,
        timingsForm.value.restaurantImage
      );
      // console.log(restaurant);
      this.restaurantService.register(restaurant).subscribe((data) => {
        this.openSnackBar(data, 'OK');
        this.updateRole();
        this.restaurantService
          .getRestaurantByEmail(this.userEmail)
          .subscribe((data) => {
            this.restaurantId = data.id;
          });
        this.nextTab();
      });
    }
    if (!this.timingsForm.valid) {
      this.openSnackBar(
        'Please fill all the required details in the current tab',
        'OK'
      );
    }
    if (
      !this.restaurantFormOneAddress.valid ||
      !this.restaurantFormOneContact
    ) {
      this.openSnackBar(
        'Please fill all the required details in the previous tab',
        'OK'
      );
    }
  }

  convertTime(timing: string) {
    let time = timing.split(' ');
    if (time[1] === 'AM') {
      return time[0] + ':00';
    } else {
      let hoursMinutes = time[0].split(':');
      let finalTime =
        Number(hoursMinutes[0]) + 12 + ':' + hoursMinutes[1] + ':' + '00';
      return finalTime;
    }
  }

  updateRole() {
    this.userService.updateUserRole(this.userEmail).subscribe((data) => {
      console.log(data);
    });
  }
}
