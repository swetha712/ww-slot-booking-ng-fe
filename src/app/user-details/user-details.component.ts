import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apiservice } from '../../services/apiservice.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,MatSnackBarModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  editForm!: FormGroup;
  user: any; // To store the current user data

  constructor(
    private fb: FormBuilder,
    private apiService: Apiservice,
    private router: Router,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.loadUserData();
  }

  // Initialize the form with validations
  initializeForm() {
    this.editForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  // Load the logged-in user data into the form
  loadUserData() {
    this.apiService.getLoggedInUser().subscribe((data: any) => {
      this.user = data;
      this.editForm.patchValue(this.user); // Patch the values into the form
    });
  }

  // Handle form submission
  saveUser() {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;

      // Update logged-in user data
      this.apiService.updateLoggedInUser(updatedData).subscribe(() => {
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000, // 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        // Fetch updated logged-in user data
        this.apiService.getLoggedInUser().subscribe((data) => {
          this.user = data; // Updated user data
          this.router.navigate(['/profile']); // Ensure this route exists
        });
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
  
  
  
}
