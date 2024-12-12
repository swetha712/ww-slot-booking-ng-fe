import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private mobileOtp = 'http://localhost:8800/api/send-otp';
  private mobileVerify = 'http://localhost:8800/api/verify-otp';
  private emailOtp = 'http://localhost:8800/api/send-email-otp';
  private emailVerify = 'http://localhost:8800/api/verify-email-otp';
  private register = 'http://localhost:8800/api/register';

  constructor(private http: HttpClient) {}

  // Send OTP to Phone
  sendPhoneOtp(phone: string): Observable<any> {
    return this.http.post(this.mobileOtp, { phone }).pipe(
      catchError((error) => {
        console.error('Error sending phone OTP:', error);
        return throwError(() => new Error('Failed to send phone OTP'));
      })
    );
  }

  // Verify Phone OTP
  verifyPhoneOtp(phone: string, otp: string): Observable<any> {
    return this.http.post(this.mobileVerify, { phone, otp }).pipe(
      catchError((error) => {
        console.error('Error verifying phone OTP:', error);
        return throwError(() => new Error('Failed to verify phone OTP'));
      })
    );
  }

  // Send OTP to Email
  sendEmailOtp(email: string): Observable<any> {
    return this.http.post(this.emailOtp, { email }).pipe(
      catchError((error) => {
        console.error('Error sending email OTP:', error);
        return throwError(() => new Error('Failed to send email OTP'));
      })
    );
  }

  // Verify Email OTP
  verifyEmailOtp(email: string, otp: string): Observable<any> {
    return this.http.post(this.emailVerify, { email, otp }).pipe(
      catchError((error) => {
        console.error('Error verifying email OTP:', error);
        return throwError(() => new Error('Failed to verify email OTP'));
      })
    );
  }

  // Register User
  registerUser(data: any): Observable<any> {
    return this.http.post(this.register, data).pipe(
      catchError((error) => {
        console.error('Error registering user:', error);
        return throwError(() => new Error('Failed to register user'));
      })
    );
  }
}
