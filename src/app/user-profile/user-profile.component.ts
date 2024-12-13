import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apiservice } from '../../services/apiservice.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserProfileComponent implements OnInit {
  user: any; // To store the logged-in user data

  profileActions: Array<any> = [
    { name: 'Favourites', icon: 'favorite_border' },
    { name: 'Downloads', icon: 'cloud_download' },
    { name: 'Language', icon: 'language' },
    { name: 'Location', icon: 'location_on' },
    { name: 'Subscription', icon: 'subscriptions' },
    { name: 'Booking History', icon: 'history' },
    { name: 'Refer a Friend', icon: 'person_add' },
  ];

  constructor(
    private apiService: Apiservice,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit() {
    this.fetchLoggedInUser();
  }

  fetchLoggedInUser() {
    this.apiService.getLoggedInUser().subscribe((data) => {
      this.user = data; // Updated data will reflect here
    });
  }

  goToEditPage() {
    this.router.navigate(['/edit-profile']); // Ensure this route exists in your routing configuration
  }

  logout() {
    this.snackBar.open('Logged out successfully!', 'Close', {
      duration: 3000, // 3 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    this.router.navigate(['/login']); // Navigate to login page after logout
  }
}
