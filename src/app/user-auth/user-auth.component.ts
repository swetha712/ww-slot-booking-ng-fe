import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Apiservice } from '../../services/apiservice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule,CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss'],
})
export class UserAuthComponent {
  showlogin: boolean = false;
  authError: string = '';

  constructor(private apiservice: Apiservice, private router: Router) {}

  openLogin():void {
    this.showlogin = true;
  }

  openSignup():void {
    this.showlogin = false;
  }

  signUp(userDetails: any): void {
    this.apiservice.addUser(userDetails).subscribe(
      () => {
        console.log('New user added:', userDetails);
        this.apiservice.setCurrentUser(userDetails);
        console.log('Current User',userDetails);
        this.router.navigate(['./turfdetails']);
      },
      (error) => {
        console.error('Error adding user:', error);
        this.authError = 'Failed to register. Please try again later.';
      }
    );
  }

  login(credentials: any): void {
    this.apiservice.getuser().subscribe((existingUsers) => {
      const user = existingUsers.find(
        (user: any) =>
          (user.Email === credentials.Email || user.phone === credentials.Email) &&
          user.password === credentials.password
      );

      if (user) {
        console.log('Login successful for user:', user);
        this.apiservice.setCurrentUser(user);
        console.log('Current User',user.name,user.password);
        this.router.navigate(['/home']);
      } else {
        console.warn('User not found. Please register.');
        this.authError = 'User not found! Please register.';
      }
    });
  }

}
