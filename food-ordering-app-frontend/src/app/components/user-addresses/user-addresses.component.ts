import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from 'src/app/models/restaurant';
import { UserAddress } from 'src/app/models/user-address';
import { UserService } from 'src/app/services/user.service';
import { AddAddressComponent } from '../add-address/add-address.component';
import { AddNewAddressComponent } from '../add-new-address/add-new-address.component';
import { EditAddressComponent } from '../edit-address/edit-address.component';

@Component({
  selector: 'app-user-addresses',
  templateUrl: './user-addresses.component.html',
  styleUrls: ['./user-addresses.component.css'],
})
export class UserAddressesComponent implements OnInit {
  userAddresses: UserAddress[] = [];
  @Input() userEmail: string = '';
  @Input() userId: number = 0;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserAddresses();
  }

  openAddAdressDialog() {
    const dialogRef = this.dialog.open(AddNewAddressComponent, {
      data: {
        email: this.userEmail,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserAddresses();
    });
  }

  getUserAddresses() {
    this.userService.getAddressByEmail(this.userEmail).subscribe((data) => {
      this.userAddresses = data;
    });
  }

  onDelete(addressId: number) {
    this.userService.deleteUserById(addressId).subscribe((data) => {
      this.openSnackBar(data, 'OK');
      this.getUserAddresses();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  openEditAddressDialog(address: UserAddress) {
    const dialogRef = this.dialog.open(EditAddressComponent, {
      data: address,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserAddresses();
    });
  }
}
