import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apiservice } from '../../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BookingStateService } from '../bookingstate.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  turfDetails: any;
  slotDetails: any;
  currentUser: any;
  orderId: string = '';
  paymentMethod: string = 'GPay'; // Default payment method
  currentDate:Date=new Date();

  constructor(
    private apiService: Apiservice,
    private route: ActivatedRoute,
    public router: Router,
    private bookingStateService: BookingStateService,
  ) {}

  ngOnInit(): void {
    this.orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
    console.log('order-details component rendered');
    console.log('Turf Details',this.turfDetails);
  
    this.bookingStateService.getState().subscribe((state) => {
      console.log('state=',state);
      if (state) {
        console.log('State received from service:', state);
        this.turfDetails = state.turfDetails;
        this.slotDetails = state.slotDetails;
      }
       else {
        console.error('No booking data available!');
      }
    });
  
    // Fetch current user details
    this.apiService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('current user', user);
      console.log("slotdetails=",this.slotDetails);
    });
  } 
  
downloadETicket(): void {
  const element = document.body;
  html2canvas(element).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('E-Ticket.pdf');
  });
}                                                                                                                                                                           
}
