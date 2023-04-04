import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent {
  updateProfile: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.updateProfile = this.fb.group({
      fullName: [data.fullName, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
      mobileNumber: [
        data.mobileNumber,
        [Validators.required, Validators.pattern(/^(0|91)?[6-9][0-9]{9}$/)],
      ],
    });
  }

  onSubmit() {
    let updatedUser: User = new User(
      this.updateProfile.value.fullName,
      this.updateProfile.value.mobileNumber,
      this.updateProfile.value.email,
      this.data.username,
      this.data.password,
      this.data.role,
      this.data.id
    );

    this.userService.updateProfile(updatedUser).subscribe((data) => {
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('fullName', data.fullName);
      this.dialog.closeAll();
    });
  }
}
