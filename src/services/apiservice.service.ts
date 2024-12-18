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
  loadBookedSlots(turfid:any):Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/turfdetails/${turfid}`);
}
bookSlot(turfId:any , courtno: number, newSlot: { date: string; slotno: number }): Observable<any> {
  return new Observable((observer) => {
    // Get the turf details by ID
    this.http.get<any>(`http://localhost:3000/turfdetails/${turfId}`).subscribe(
      (turf: any) => {
        // Find the relevant court in the turf
        const court = turf.courts.find((c: any) => c.courtno === courtno);

        if (!court) {
          observer.error('Court not found');
          return;
        }

        // Check if the slot already exists
        const isDuplicate = court.slots.some(
          (slot: any) => slot.date === newSlot.date && slot.slotno === newSlot.slotno
        );

        if (isDuplicate) {
          observer.error('Slot already booked');
        } else {
          // Add the new slot to the court's slots array
          court.slots.push(newSlot);

          // Update the turf details in the API
          this.http
            .patch(`http://localhost:3000/turfdetails/${turfId}`, { courts: turf.courts })
            .subscribe(
              (response) => observer.next(response),
              (error) => observer.error(error)
            );
        }
      },
      (error) => observer.error(error)
    );
  });
}
}