import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/models/credentials';
import { UserService } from 'src/app/services/user.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  userCredentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.dialog.closeAll();
    this.userCredentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpComponent);
  }

  onSubmit() {
    const credentials: Credentials = new Credentials(
      this.userCredentials.value.email,
      this.userCredentials.value.password
    );
    this.userService.loginUser(credentials).subscribe(
      (data) => {
        console.log(data);
        this.openSnackBar('Login Successful', 'OK');
        this.userService.login(
          this.userCredentials.value.email,
          data.toString()
        );
        this.dialog.closeAll();
        // this.router.navigateByUrl('/home');
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
