import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserAddress } from 'src/app/models/user-address';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css'],
})
export class AddNewAddressComponent {
  userAddress: FormGroup;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialog.closeAll();

    this.email = data.email;

    this.userAddress = this.fb.group({
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{6}$/),
          Validators.minLength(6),
        ],
      ],
      houseNumber: ['', [Validators.required]],
      locality: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const address: UserAddress = new UserAddress(
      0,
      this.email,
      this.userAddress.value.city,
      this.userAddress.value.state,
      this.userAddress.value.pincode,
      this.userAddress.value.houseNumber,
      this.userAddress.value.locality
    );
    this.userService.addNewAddress(address).subscribe(
      (data) => {
        console.log(data);
        this.openSnackBar('Address added successfully', 'OK');
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
