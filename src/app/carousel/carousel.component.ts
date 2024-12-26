// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { MatCardModule } from '@angular/material/card';
// import { SlickCarouselModule } from 'ngx-slick-carousel';
// import { CarouselService } from '../services/carousel.service';

// @Component({
//   selector: 'app-carousel',
//   standalone: true,
//   imports: [CommonModule, MatCardModule, SlickCarouselModule], // Import Angular Material and Slick Carousel
//   templateUrl: './carousel.component.html',
//   styleUrls: ['./carousel.component.scss']
// })
// export class CarouselComponent implements OnInit {
//   turfDetails: any[] = [];

//   carouselConfig = {
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     infinite: true,
//     arrows: true,
//     dots: true,
//     autoplay: true,
//     autoplaySpeed: 3000
//   };


//   constructor(private carouselService: CarouselService) {}

//   ngOnInit() {
//     this.loadTurfDetails();
//     console.log('Carousel Instantiated');
    
//   }

//   private loadTurfDetails(): void {
//     this.carouselService.getTurfDetails().subscribe(
//       (data) => {
//         console.log('turf datas');
//         this.turfDetails = data.map((turf: any) => {
//           turf.image1 = turf.image1 || turf.image || '';
//           return turf;
//         });
//       },
//       (error) => {
//         console.error('Error fetching turf details:', error);
//       }
//     );
//   }
// }



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
  autoplaySpeed = 5000; // Speed of auto-switching slides (in ms)

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
          image1: turf.image1 || turf.image || ''
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
