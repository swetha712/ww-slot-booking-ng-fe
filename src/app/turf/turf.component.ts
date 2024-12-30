import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apiservice } from '../../services/apiservice.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { ThemeConflictService } from '../../services/theme-conflict.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-turf',
  templateUrl: './turf.component.html',
  styleUrls: ['./turf.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIcon,MatAccordion,MatExpansionModule],
  providers: [Apiservice,ThemeConflictService, ThemeService],
})
export class TurfComponent implements OnInit, OnDestroy {
  turfDetails: any = {};
  currentImageIndex = 0;
  galleryCurrentIndex = 0;
  selectedCourt: any = null;
  courtDetails: any[] = [];
  galleryImages: string[] = [];
  autoScrollInterval: any;

  constructor(private apiService: Apiservice,
     private router: Router,
     private themeService: ThemeService) {}

  ngOnInit(): void {
    // Fetch turf details from the API
    this.apiService.getTurfDetails().subscribe((data) => {
      if (data && data.length > 0) {
        this.turfDetails = {
          ...data[0],
          images: [
            data[0]?.image1 || 'default-image1.jpg',
            data[0]?.image2 || 'default-image2.jpg',
            data[0]?.image3 || 'default-image3.jpg',
            data[0]?.image4 || 'default-image4.jpg',
            data[0]?.image5 || 'default-image5.jpg',
            data[0]?.court_image1 || 'default-court-image1.jpg',
            data[0]?.court_image2 || 'default-court-image2.jpg',
          ],
          courtImages: [
            data[0]?.court_image1 || 'default-court-image1.jpg',
            data[0]?.court_image2 || 'default-court-image2.jpg',
          ],
        };
  
        this.galleryImages = this.turfDetails.images;
        this.courtDetails = [
          { id: 1, image: this.turfDetails.courtImages[0], name: 'Court 1' },
          { id: 2, image: this.turfDetails.courtImages[1], name: 'Court 2' },
        ];
  
        // Start auto-scrolling
        this.startAutoScroll();
      } else {
        console.error('No data found for turf details');
        this.turfDetails = {}; // Fallback initialization
      }
    });
    
  }
  
 
  amenities = [
    { name: 'Drinking Water', icon: 'local_drink' },
    { name: 'Restroom', icon: 'wc' },
    { name: 'Locker', icon: 'lock' },
    { name: 'AC', icon: 'ac_unit' },
  ];

  includes = [
    { name: 'Badminton Racket Unlimited', isIncluded: true },
    { name: 'Bats', isIncluded: true },
    { name: 'Hitting Machines', isIncluded: true },
    { name: 'Multiple Courts', isIncluded: true },
    { name: 'Spare Players', isIncluded: true },
    { name: 'Instant Racket', isIncluded: true },
    { name: 'Green Turfs', isIncluded: true },
  ];
  // Start auto-scrolling for carousel and gallery
  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.turfDetails.images.length;
      this.galleryCurrentIndex =
        (this.galleryCurrentIndex + 1) % this.turfDetails.images.length;
    }, 3000); // Change image every 3 seconds
  }

  // Stop auto-scrolling on component destroy
  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }

  selectCourt(court: any) {
    this.selectedCourt = court;
  }

  bookNow() {
    if (this.selectedCourt) {
      // Navigate to 'profile' route(dummy)
      this.router.navigate(['/court']);
    }
  }
  
    
  }


