import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingStateService {
  private bookingState = new BehaviorSubject<any>(null);

  setState(state: any): void {
    this.bookingState.next(state);
  }

  getState(): Observable<any> {
    return this.bookingState.asObservable();
  }
}
