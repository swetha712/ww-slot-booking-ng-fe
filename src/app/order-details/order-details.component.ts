import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apiservice } from '../../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
goBack() {
throw new Error('Method not implemented.');
}
  turfDetails: any;
  selectedCourt: any;
  currentUser: any;
  slots: any[] = [];

  constructor(
    private apiService: Apiservice,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the current user
    this.apiService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    });
  
    // Get turf ID from route params
    const turfId = this.route.snapshot.paramMap.get('id');
    if (turfId) {
      this.apiService.getTurfDetails().subscribe((turfs) => {
        this.turfDetails = turfs.find((turf: any) => turf.id === turfId);
  
        if (this.turfDetails?.courts?.length > 0) {
          this.selectedCourt = this.turfDetails.courts[0]; // Default to the first court
          this.slots = this.selectedCourt.slots;
        } else {
          console.warn('No courts found for this turf.');
        }
      });
    }
  }
}