import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {
private apiUrl ='http://localhost:3000/userinfo';
private currentUserSubject = new BehaviorSubject<any>(null);
  constructor(private http:HttpClient) {}

  getuser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addUser(userDetails: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userDetails);
  }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }
  
}
