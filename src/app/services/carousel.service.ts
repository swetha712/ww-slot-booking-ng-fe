import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  private apiUrl = 'https://mocki.io/v1/5e93601b-87af-4150-bdc7-b27c4f1e1acc'; // Update to match your API URL

  constructor(private http: HttpClient) {}

  getTurfDetails(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
