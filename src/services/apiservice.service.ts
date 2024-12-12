import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable(

)

export class Apiservice {
private apiUrl ='http://localhost:3000/turfdetails'
  constructor(private http:HttpClient) {}
  getuser():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
