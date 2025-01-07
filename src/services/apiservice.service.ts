import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Apiservice {
  getOrdersByUser(id: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl ='http://localhost:3000/userinfo';
private turfUrl ='http://localhost:3000/turfdetails'
private currentUserSubject = new BehaviorSubject<any>(null);
private loginurl ='http://localhost:3000/logged-in'
  constructor(private http:HttpClient) {}
  getuser():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
  getTurfDetails(): Observable<any> {
    return this.http.get<any>(this.turfUrl);
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
loadBookedSlots(turfid:any):Observable<any> {
  return this.http.get<any[]>(`http://localhost:3000/turfdetails/${turfid}`);
}
bookSlot(turfId: any, courtNo: number, newSlot: { date: string; slotno: number }): Observable<any> {
  return new Observable((observer) => {
    this.http.get<any>(`${this.turfUrl}/${turfId}`).subscribe(
      (turf: any) => {
        console.log('Fetched turf data:', turf); // Debug

        const court = turf.courts.find((c: any) => c.courtno === courtNo);
        if (!court) {
          observer.error('Court not found');
          return;
        }

        console.log('Selected court:', court); // Debug

        const isDuplicate = court.slots.some(
          (slot: any) => slot.date === newSlot.date && slot.slotno === newSlot.slotno
        );

        if (isDuplicate) {
          observer.error('Slot already booked');
        } else {
          court.slots.push(newSlot);

          // Update the turf details in the API
          this.http
            .patch(`${this.turfUrl}/${turfId}`, { courts: turf.courts })
            .subscribe(
              (response) => {
                console.log('Slot booked successfully:', response); // Debug
                observer.next(response);
              },
              (error) => observer.error(error)
            );
        }
      },
      (error) => observer.error(error)
    );
  });
}


getBookedSlot(turfId: number, courtNo: number, date: string, slotNo: number): Observable<any> {
  return this.http.get<any>(`${this.turfUrl}/${turfId}`).pipe(
    map((turf: any) => {
      const court = turf.courts.find((c: any) => c.courtno === courtNo);
      if (!court) {
        throw new Error(`Court ${courtNo} not found`);
      }

      const bookedSlot = court.slots.find(
        (slot: any) => slot.date === date && slot.slotno === slotNo
      );
      if (!bookedSlot) {
        throw new Error(`Slot not found for date ${date} and slot number ${slotNo}`);
      }

      return {
        turf,
        court,
        slot: bookedSlot,
      };
    })
  );
}



}
  

