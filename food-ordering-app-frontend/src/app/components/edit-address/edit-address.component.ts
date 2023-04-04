import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
import { User } from 'src/app/models/user';
import { UserAddress } from 'src/app/models/user-address';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css'],
})
export class EditAddressComponent {
  userAddress: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: UserAddress
  ) {
    this.dialog.closeAll();

    this.userAddress = this.fb.group({
      city: [data.city, [Validators.required]],
      state: [data.state, [Validators.required]],
      pincode: [
        data.pincode,
        [
          Validators.required,
          Validators.pattern(/^[0-9]{6}$/),
          Validators.minLength(6),
        ],
      ],
      houseNumber: [data.houseNumber, [Validators.required]],
      locality: [data.locality, [Validators.required]],
    });
  }

  onSubmit() {
    const address: UserAddress = new UserAddress(
      this.data.id,
      this.email,
      this.userAddress.value.city,
      this.userAddress.value.state,
      this.userAddress.value.pincode,
      this.userAddress.value.houseNumber,
      this.userAddress.value.locality
    );

    this.userService.updateAddress(address).subscribe(
      (data) => {
        console.log(data);
        this.openSnackBar('Address updated successfully', 'OK');
        this.dialog.closeAll();
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
}
