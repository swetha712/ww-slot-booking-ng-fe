import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Apiservice } from '../../services/apiservice.service';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,MatSnackBarModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})


export class UserDetailsComponent implements OnInit {
  editForm: FormGroup;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private apiService: Apiservice,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      Email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    });
  }

  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.currentUser = user;
        this.editForm.patchValue({
          name: user.name || user.name,
          password: user.password,
          Email: user.Email || user.Email,
          phone: user.phone || user.phone,
        });
      }
    });
  }

  saveUser(): void {
    if (this.editForm.valid && this.currentUser) {
      const updatedData = {
        ...this.currentUser,
        name: this.editForm.value.name,
        password: this.editForm.value.password,
        Email: this.editForm.value.Email,
        phone: this.editForm.value.phone,
      };

      this.apiService.updateUser(this.currentUser.id, updatedData).subscribe(
        () => {
          console.log('User updated successfully:', updatedData);
          this.apiService.setCurrentUser(updatedData);
          alert('Profile updated successfully!');
          this.router.navigate(['/turfdetails']);
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update profile. Please try again.');
        }
      );
    }
  }
}
