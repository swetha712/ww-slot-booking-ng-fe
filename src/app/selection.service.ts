import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Save booking details
  saveBooking(booking: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orderDetails`, booking);
  }

  // Fetch all bookings
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orderDetails`);
  }
}
