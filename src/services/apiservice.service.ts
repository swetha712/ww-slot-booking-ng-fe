import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable(

)

export class Apiservice {
  
private apiUrl ='http://localhost:3000/userinfo';
private turfUrl ='http://localhost:3000/turfdetails'
private currentUserSubject = new BehaviorSubject<any>(null);
private loginurl ='http://localhost:3000/logged-in'
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
  

// Get the logged-in user
getLoggedInUser(): Observable<any> {
  return this.http.get<any>(`${this.loginurl}`);
}

// Update user by ID
updateUser(id: string, data: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, data);
}
updateLoggedInUser(updatedData: any): Observable<any> {
  return this.http.put<any>(this.loginurl, updatedData); // Ensure API updates the correct logged-in data
}

}
