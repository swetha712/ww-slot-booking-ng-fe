// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class CarouselService {
//   private baseUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) {}

//   // Fetch user info
//   getUserInfo(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/userinfo`);
//   }

//   // Fetch turf details
//   getTurfDetails(): Observable<any> {
//     console.log("turf details instantiated")
//     return this.http.get(`${this.baseUrl}/turfdetails`);
//   }

//   // Fetch order details
//   getOrderDetails(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/orderdetails`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private apiUrl = 'http://localhost:3000/turfdetails'; // Update to match your API URL

  constructor(private http: HttpClient) {}

  getTurfDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
