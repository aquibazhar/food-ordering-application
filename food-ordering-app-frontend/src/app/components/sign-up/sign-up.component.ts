import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AddAddressComponent } from '../add-address/add-address.component';
import { SignInComponent } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  userDetails: FormGroup;
  userCredentials: FormGroup;

  checked: boolean = false;
  passwordTyped: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.dialog.closeAll();
    this.passwordTyped = '';
    this.userDetails = this.fb.group({
      fullName: ['', [Validators.required]],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern(/^(0|91)?[6-9][0-9]{9}$/)],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    this.userCredentials = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
      checked: [false, [Validators.requiredTrue]],
    });
  }

  onChange(): void {
    this.passwordTyped = this.userCredentials.value.password;
  }

  onSubmit() {
    const userInfo = new User(
      this.userDetails.value.fullName,
      this.userDetails.value.mobileNumber,
      this.userDetails.value.email,
      this.userCredentials.value.username,
      this.userCredentials.value.password,
      'user',
      0
    );
    this.userService.registerUser(userInfo).subscribe((data) => {
      this.openSnackBar('Register Successful!!!', 'OK');
      this.openAddAdressDialog(userInfo.email);
    });
  }

  openSigninDialog() {
    const dialogRef = this.dialog.open(SignInComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.openSnackBar(result, 'OK');
    });
  }

  openAddAdressDialog(userEmail: string) {
    const dialogRef = this.dialog.open(AddAddressComponent, {
      disableClose: true,
      data: {
        email: this.userDetails.value.email,
      },
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }
}
