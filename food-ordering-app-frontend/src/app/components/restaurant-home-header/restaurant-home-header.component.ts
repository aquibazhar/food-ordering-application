import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { RedirectDialogComponent } from '../redirect-dialog/redirect-dialog.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-restaurant-home-header',
  templateUrl: './restaurant-home-header.component.html',
  styleUrls: ['./restaurant-home-header.component.css'],
})
export class RestaurantHomeHeaderComponent {
  isLoggedIn: boolean = false;
  fullName: string;
  role: string;
  email: string;
  user: User = {} as User;

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
    const fullName = sessionStorage.getItem('fullName');
    this.fullName = fullName === null ? '' : fullName;

    const email = sessionStorage.getItem('email');
    this.email = email === null ? '' : email;

    const role = sessionStorage.getItem('role');
    this.role = role === null ? '' : role;

    this.getUserDetails();
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

  openRestaurantDashboard() {
    if (!this.isLoggedIn) {
      this.openSigninDialog();
      return;
    }
    if (this.user.role === 'restaurant') {
      this.router.navigateByUrl('/partner-with-us/restaurant-dashboard');
      return;
    } else {
      const dialogRef = this.dialog.open(RedirectDialogComponent, {
        data: {
          title: 'Go to add restaurant page?',
          subtitle: "You haven't added a restaurant yet",
          buttonText: 'Yes',
        },
      });

      dialogRef.afterClosed().subscribe((confirmation) => {
        if (confirmation) {
          this.router.navigateByUrl('/partner-with-us/add-restaurant');
        }
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  openDashboardRedirect() {
    const dialogRef = this.dialog.open(RedirectDialogComponent, {
      data: {
        title: 'Go to restaurant dashboard?',
        subtitle: 'You already added a Restaurant',
        buttonText: 'Yes',
      },
    });

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.router.navigateByUrl('/partner-with-us/restaurant-dashboard');
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getUserDetails() {
    this.userService.getUserByEmail(this.email).subscribe((data) => {
      this.user = data;
      console.log(this.user.role);
    });
  }

  openAddRestaurant() {
    if (!this.isLoggedIn) {
      this.openSigninDialog();
    } else if (this.isLoggedIn && this.user.role === 'restaurant') {
      this.openDashboardRedirect();
    } else {
      this.router.navigateByUrl('/partner-with-us/add-restaurant');
    }
  }
}
