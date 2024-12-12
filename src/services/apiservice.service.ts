import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {
private apiUrl ='http://localhost:3000/userinfo'
  constructor(private http:HttpClient) {}
  getuser():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
