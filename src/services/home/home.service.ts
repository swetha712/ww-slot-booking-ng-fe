import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class HomeService{
    private http = inject(HttpClient);

    getTurfList(){
        return this.http.get(``);
    }
}