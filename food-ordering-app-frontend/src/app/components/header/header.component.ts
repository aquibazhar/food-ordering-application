import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn:boolean = false;



  constructor(private dialog: MatDialog, private userService: UserService){

    this.userService.isLoggedIn.subscribe( (isLoggedIn) => (this.isLoggedIn = isLoggedIn))
    this.updateLoginStatus()
  }

  openSignUpDialog() {
    const dialogRef = this.dialog.open(SignUpComponent);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  openSigninDialog() {
    const dialogRef = this.dialog.open(SignInComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  logout(){
    this.userService.logout();
    this.updateLoginStatus()

  }

  updateLoginStatus(){
    this.userService.isLoggedIn.subscribe( (isLoggedIn) => (this.isLoggedIn = isLoggedIn))
  }
  
}
