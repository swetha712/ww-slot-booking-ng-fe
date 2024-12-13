import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable(

)

export class Apiservice {
  get(arg0: string) {
    throw new Error('Method not implemented.');
  }
private apiUrl ='http://localhost:3000/turfdetails'
  constructor(private http:HttpClient) {}
  getuser():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
}
