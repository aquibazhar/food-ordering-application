import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { Restaurant } from 'src/app/models/restaurant';
import { AdminService } from 'src/app/services/admin.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UserService } from 'src/app/services/user.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  isLoggedIn: boolean = false;

  adminCredentials: FormGroup;
  restaurants: Restaurant[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private restaurantService: RestaurantService,
    private adminService: AdminService
  ) {
    this.dialog.closeAll();
    this.adminCredentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.getAllRestaurants();
  }

  onSubmit() {
    const credentials: Credentials = new Credentials(
      this.adminCredentials.value.email,
      this.adminCredentials.value.password
    );

    this.adminService.loginAdmin(credentials).subscribe(
      (data) => {
        this.isLoggedIn = true;
        this.openSnackBar(data, 'OK');
      },
      (error) => {
        this.openSnackBar(String(error).substring(7), 'OK');
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      this.restaurants = data;
      console.log(this.restaurants);
    });
  }

  changeApprovalStatus(restaurantId: number) {
    this.adminService.changeApprovalStatus(restaurantId).subscribe((data) => {
      this.getAllRestaurants();
      this.openSnackBar(data, 'OK');
    });
  }
}
