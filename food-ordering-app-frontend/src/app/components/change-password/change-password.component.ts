import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Credentials } from 'src/app/models/credentials';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePassword } from 'src/app/models/change-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  passwordTyped: string;
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.passwordTyped = '';
    const email = sessionStorage.getItem('email');
    this.email = email !== null ? email : '';

    this.changePasswordForm = this.fb.group({
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
          ),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onChange(): void {
    this.passwordTyped = this.changePasswordForm.value.newPassword;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    });
  }

  onSubmit() {
    const credentials: ChangePassword = new ChangePassword(
      this.email,
      this.changePasswordForm.value.oldPassword,
      this.changePasswordForm.value.newPassword
    );

    this.userService.changePassword(credentials).subscribe(
      (data) => {
        this.openSnackBar(data, 'OK');
      },
      (error) => {
        this.openSnackBar('Invalid old password', 'OK');
      }
    );
  }
}
