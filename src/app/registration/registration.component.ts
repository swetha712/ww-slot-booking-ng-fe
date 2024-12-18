import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationService } from '../service/registration-service';
import { RegisterForm4Component } from '../register-form4/register-form4.component';

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
  isEmailVerified: boolean = false;
  phoneOtpValid: boolean = false;
  emailOtpValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService:RegistrationService
  ) {
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

  
  // Custom Validator
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Send OTP to Phone
  sendPhoneOtp() {
    if (this.registrationForm.get('phone')?.valid) {
      const phone = this.registrationForm.get('phone')?.value;
      this.registrationService.sendPhoneOtp(phone).subscribe({
        next: () => {
          this.phoneOtpSent = true;
          this.registrationForm.get('phoneOtp')?.setValidators(Validators.required);
          this.registrationForm.get('phoneOtp')?.updateValueAndValidity();
          console.log('OTP sent to phone successfully');
        },
        error: (err) => console.error('Error sending phone OTP:', err)
      });
    }
  }

  // Verify Phone OTP
  verifyPhoneOtp() {
    const phone = this.registrationForm.get('phone')?.value;
    const otp = this.registrationForm.get('phoneOtp')?.value;
    this.registrationService.verifyPhoneOtp(phone, otp).subscribe({
      next: () => {
        this.isPhoneVerified = true;
        this.phoneOtpValid = true;
        console.log('Phone verified successfully');
      },
      error: (err) => {
        this.isPhoneVerified = false;
        this.phoneOtpValid = false;
        console.error('Invalid phone OTP:', err);
      }
    });
  }

  // Send OTP to Email
  sendEmailOtp() {
    if (this.registrationForm.get('email')?.valid) {
      const email = this.registrationForm.get('email')?.value;
      this.registrationService.sendEmailOtp(email).subscribe({
        next: () => {
          this.emailOtpSent = true;
          this.registrationForm.get('emailOtp')?.setValidators(Validators.required);
          this.registrationForm.get('emailOtp')?.updateValueAndValidity();
          console.log('OTP sent to email successfully');
        },
        error: (err) => console.error('Error sending email OTP:', err)
      });
    }
  }

  // Verify Email OTP
  verifyEmailOtp() {
    const email = this.registrationForm.get('email')?.value;
    const otp = this.registrationForm.get('emailOtp')?.value;
    this.registrationService.verifyEmailOtp(email, otp).subscribe({
      next: () => {
        this.isEmailVerified = true;
        this.emailOtpValid = true;
        console.log('Email verified successfully');
      },
      error: (err) => {
        this.isEmailVerified = false;
        this.emailOtpValid = false;
        console.error('Invalid email OTP:', err);
      }
    });
  }

  // Register User
  onSubmit() {
    if (this.registrationForm.valid && this.isPhoneVerified && this.isEmailVerified) {
      const userData = { ...this.registrationForm.value };
      delete userData.phoneOtp;
      delete userData.emailOtp;

      this.registrationService.registerUser(userData).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']); // Navigate to login
        },
        error: (err) => console.error('Registration failed:', err)
      });
    } else {
      console.log('Please complete all verifications and validations.');
    }
  }

  // Navigate to Login
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
