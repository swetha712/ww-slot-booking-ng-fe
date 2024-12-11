import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  emailOtpSent: boolean = false;
  phoneOtpSent: boolean = false;
  isPhoneVerified: boolean = false;
  isEmailVerified: boolean = false; // Track email verification status
  phoneOtpValid: boolean = false;
  emailOtpValid: boolean = false; // Track email OTP validity
  phoneOtpEntered: boolean = false;
  emailOtpEntered: boolean = false; // Track email OTP entry

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      phoneOtp: [''],
      email: ['', [Validators.required, Validators.email]],
      emailOtp: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom Validator to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Function to send OTP to Email
  sendEmailOtp() {
    if (this.registrationForm.get('email')?.valid) {
      console.log('Sending OTP to email:', this.registrationForm.get('email')?.value);
      this.emailOtpSent = true;
      this.registrationForm.get('emailOtp')?.setValidators(Validators.required);
      this.registrationForm.get('emailOtp')?.updateValueAndValidity();
    }
  }

  // Function to send OTP to Phone
  sendPhoneOtp() {
    if (this.registrationForm.get('phone')?.valid) {
      console.log('Sending OTP to phone:', this.registrationForm.get('phone')?.value);
      this.phoneOtpSent = true;
      this.registrationForm.get('phoneOtp')?.setValidators(Validators.required);
      this.registrationForm.get('phoneOtp')?.updateValueAndValidity();
    }
  }

  // Function to verify Phone OTP
  verifyPhoneOtp() {
    this.phoneOtpEntered = true;
    const enteredOtp = this.registrationForm.get('phoneOtp')?.value;
    if (enteredOtp === '123456') { // Simulate OTP validation
      this.isPhoneVerified = true;
      this.phoneOtpValid = true;
    } else {
      this.isPhoneVerified = false;
      this.phoneOtpValid = false;
    }
  }

  // Function to verify Email OTP
  verifyEmailOtp() {
    this.emailOtpEntered = true;
    const enteredOtp = this.registrationForm.get('emailOtp')?.value;
    if (enteredOtp === '654321') { // Simulate OTP validation for email
      this.isEmailVerified = true;
      this.emailOtpValid = true;
    } else {
      this.isEmailVerified = false;
      this.emailOtpValid = false;
    }
  }

  // Submit the form after validation
  onSubmit() {
    if (this.registrationForm.valid && this.isPhoneVerified && this.isEmailVerified) {
      console.log('Form Submitted:', this.registrationForm.value);
    } else {
      console.log('Please verify your phone number and email before submitting.');
    }
  }

  // Navigate to the Login page
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}