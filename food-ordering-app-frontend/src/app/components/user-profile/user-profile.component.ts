import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserAddress } from 'src/app/models/user-address';
import { UserService } from 'src/app/services/user.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  email: string = '';
  user: User = {} as User;
  userAddresses: UserAddress[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) {
    const email = sessionStorage.getItem('email');
    this.email = email === null ? '' : email;

    this.getUserByEmail();
  }

  getUserByEmail() {
    this.userService.getUserByEmail(this.email).subscribe((data) => {
      this.user = data;
      this.userService.getAddressByEmail(this.email).subscribe((address) => {
        this.userAddresses = address;
      });
    });
  }

  openUpdateProfileDialog() {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: this.user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserByEmail();
    });
  }
}
