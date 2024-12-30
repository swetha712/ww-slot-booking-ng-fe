import { Component,inject,OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Apiservice } from '../../services/apiservice.service';

@Component({
  selector: 'app-courtdetails',
  standalone: true,
  imports: [MatButtonModule,CommonModule,FormsModule,MatDialogModule,MatCardModule,MatIconModule],
  templateUrl: './courtdetails.component.html',
  styleUrl: './courtdetails.component.scss',

})
export class CourtdetailsComponent implements OnInit {
selectCourt(_t45: any) {
throw new Error('Method not implemented.');
}
  dateList: any[] = [];
  selectedDate: string = '';
  selectedSlot: any = null;
  availableSlots: any[] = [];
  selectedSession: any = null; // Track the selected session
  sessionButton = [
    { buttonName: 'Morning', iconName: 'wb_sunny', start: 6, end: 11, period: 'AM' },
    { buttonName: 'Noon', iconName: 'brightness_high', start: 12, end: 4, period: 'PM' },
    { buttonName: 'Evening', iconName: 'wb_twilight', start: 5, end: 11, period: 'PM' },
    { buttonName: 'Night', iconName: 'bedtime', start: 12, end: 5, period: 'AM' },
  ];

  private snackBar = inject(MatSnackBar);
slot: any;
turfDetails: any;

  constructor(private apiserv: Apiservice) {}

  ngOnInit(): void {
    this.generateDateList();
    this.loadAvailableSlots();
  }

  generateDateList() {
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      this.dateList.push({
        day: date.toLocaleString('en-US', { weekday: 'short' }),
        displayDate: date.toLocaleString('en-US', { month: 'short', day: '2-digit' }),
        date: date.toISOString().split('T')[0],
      });
    }
    this.selectedDate = this.dateList[0].date;
  }

  scrollLeft() {
    const slider = document.querySelector('.date-slider');
    slider?.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    const slider = document.querySelector('.date-slider');
    slider?.scrollBy({ left: 200, behavior: 'smooth' });
  }

  onDateSelect(date: any) {
    this.selectedDate = date.date;
    this.loadAvailableSlots();
  }

  session(selectedSession: any) {
    this.selectedSession = selectedSession;
    const { start, end, period } = selectedSession;
    const today = new Date();
    const currentHour = today.getHours();
  
    this.availableSlots = [];
    let currentTime = start;
  
    while (currentTime !== end || (period === 'AM' && currentTime === 12)) {
      const slotTime = `${currentTime}:00 ${period}`;
      const slotHour = this.convertTimeToSlot(slotTime);
  
      // Exclude past slots if selectedDate is today
      if (
        this.selectedDate !== today.toISOString().split('T')[0] ||
        slotHour > currentHour
      ) {
        this.availableSlots.push({
          label: slotTime,
          status: 'available',
        });
      }
  
      currentTime = currentTime % 12 + 1; // Increment time
    }
  
    this.loadAvailableSlots();
  }
  
  loadAvailableSlots() {
    this.apiserv.loadBookedSlots(1).subscribe((turf: any) => {
      const today = new Date();
      const currentHour = today.getHours();
  
      turf.courts.forEach((court: any) => {
        court.slots.forEach((slot: any) => {
          // Check if the slot is for the selected date
          if (slot.date === this.selectedDate) {
            // Map slot numbers to time and find in availableSlots
            const slotTimeLabel = this.mapSlotToTime(slot.slotno);
  
            const existingSlot = this.availableSlots.find(
              (s) => s.label === slotTimeLabel
            );
  
            if (existingSlot) {
              existingSlot.status = 'booked';
            }
          }
        });
      });
  
      // Remove past slots for today
      if (this.selectedDate === today.toISOString().split('T')[0]) {
        this.availableSlots = this.availableSlots.filter((slot) => {
          const slotHour = this.convertTimeToSlot(slot.label);
          return slotHour > currentHour;
        });
      }
    });
  }
  
  mapSlotToTime(slotNo: number): string {
    const hours = slotNo % 24;
    const period = hours < 12 ? 'AM' : 'PM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:00 ${period}`;
  }

  selectSlot(slot: any) {
    if (slot.status !== 'booked') {
      this.selectedSlot = slot;
    }
  }

  bookSlot() {
    const newSlot = {
      date: this.selectedDate,
      slotno: this.convertTimeToSlot(this.selectedSlot.label),
    };

    this.apiserv.bookSlot(1,1,newSlot).subscribe(
      (response) => {
        this.selectedSlot.status = 'booked';
        this.snackBar.open('Booked Successfully!','',{duration:2000}
        );
        this.loadAvailableSlots();
      },
      (error) => {
        this.snackBar.open('Slot already booked!', '', { duration: 2000 });
      }
    );
  }

  convertTimeToSlot(label: string): number {
    const [time, period] = label.split(' ');
    const hours = +time.split(':')[0];
    return period === 'PM' && hours !== 12 ? hours + 12 : period === 'AM' && hours === 12 ? 0 : hours;
  }

}