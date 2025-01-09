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
