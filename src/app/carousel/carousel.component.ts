import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarouselService } from '../services/carousel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnDestroy {
  turfDetails: any[] = [];
  currentSlide = 0;
  autoplayInterval: any;
  autoplaySpeed = 3000; // Speed of auto-switching slides (in ms)

  constructor(private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.loadTurfDetails();
    this.startAutoplay();
  }

  // Load turf details from the service
  private loadTurfDetails(): void {
    this.carouselService.getTurfDetails().subscribe(
      (data: any[]) => {
        this.turfDetails = data.map(turf => ({
          ...turf,
          // image1: turf.image1 || turf.image || ''
          image1: turf.image1 || turf.image || '',
          turfname: turf.turfname || 'Unknown Turf',
          description: turf.description || 'No description available'
        }));
      },
      (error) => {
        console.error('Error fetching turf details:', error);
      }
    );
  }

  // Go to next slide
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.turfDetails.length;
  }

  // Go to previous slide
  prevSlide(): void {
    this.currentSlide =
      (this.currentSlide - 1 + this.turfDetails.length) % this.turfDetails.length;
  }

  // Go to a specific slide
  goToSlide(slideIndex: number): void {
    this.currentSlide = slideIndex;
  }

  // Start autoplay
  startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplaySpeed);
  }

  // Stop autoplay
  stopAutoplay(): void {
    clearInterval(this.autoplayInterval);
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }
}
