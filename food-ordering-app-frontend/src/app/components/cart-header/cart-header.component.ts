import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-cart-header',
  templateUrl: './cart-header.component.html',
  styleUrls: ['./cart-header.component.css'],
})
export class CartHeaderComponent {
  isLoggedIn: boolean = false;
  fullName: string = '';
  role: string = '';

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
    this.updateLoginStatus();

    if (this.isLoggedIn) {
      const fullName = sessionStorage.getItem('fullName');
      this.fullName = fullName === null ? '' : fullName;

      const role = sessionStorage.getItem('role');
      this.role = role === null ? '' : role;
    }
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.updateLoginStatus();
    });
  }

  openSigninDialog() {
    const dialogRef = this.dialog.open(SignInComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.updateLoginStatus();

      if (this.isLoggedIn) {
        const fullName = sessionStorage.getItem('fullName');
        this.fullName = fullName === null ? '' : fullName;

        const role = sessionStorage.getItem('role');
        this.role = role === null ? '' : role;
      }
    });
  }

  logout() {
    this.userService.logout().subscribe((data) => {
      this.openSnackBar(data, 'OK');
      this.userService.updateLogout();
    });
    this.updateLoginStatus();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  updateLoginStatus() {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  openAddRestaurant() {
    if (!this.isLoggedIn) {
      this.openSigninDialog();
    } else {
      this.router.navigateByUrl('/partner-with-us/add-restaurant');
    }
  }
}
