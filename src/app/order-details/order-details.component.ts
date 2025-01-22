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
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';

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
  paymentMethod: string = 'GPay';
  currentDate: Date = new Date();
  isMobile: boolean;

  constructor(
    private apiService: Apiservice,
    private route: ActivatedRoute,
    public router: Router,
    private bookingStateService: BookingStateService
  ) {
    this.isMobile = Capacitor.isNativePlatform();
  }

  ngOnInit(): void {
    this.orderId = 'ORD-' + Math.floor(Math.random() * 1000000);
    console.log('order-details component rendered');
    console.log('Turf Details', this.turfDetails);

    this.bookingStateService.getState().subscribe((state) => {
      console.log('state=', state);
      if (state) {
        console.log('State received from service:', state);
        this.turfDetails = state.turfDetails;
        this.slotDetails = state.slotDetails;
      } else {
        console.error('No booking data available!');
      }
    });

    this.apiService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('current user', user);
      console.log('slotdetails=', this.slotDetails);
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

      if (this.isMobile) {
        pdf.output('dataurlstring');
        const pdfBlob = pdf.output('blob');
        this.savePDFToMobile(pdfBlob);
      } else {
        pdf.save('E-Ticket.pdf');
      }
    });
  }

  /**
   * 
   * @param pdfBlob 
   */
  private async savePDFToMobile(pdfBlob: Blob): Promise<void> {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];

        const fileName = `E-Ticket-${this.orderId}.pdf`;
        const writeResult = await Filesystem.writeFile({
          path: fileName,
          data: base64data || '',
          directory: Directory.Documents,
        });

        console.log('PDF saved to:', writeResult.uri);
        alert('E-Ticket saved successfully to Documents!');
      };

      reader.readAsDataURL(pdfBlob);
    } catch (error) {
      console.error('Error saving PDF to mobile filesystem:', error);
      alert('Failed to save E-Ticket. Please try again.');
    }
  }
}
