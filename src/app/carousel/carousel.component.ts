import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselService } from '../services/carousel.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, MatCardModule, SlickCarouselModule], // Import Angular Material and Slick Carousel
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  turfDetails: any[] = [];

  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000
  };


  constructor(private carouselService: CarouselService) {}

  ngOnInit() {
    this.loadTurfDetails();
    console.log('Carousel Instantiated');
    
  }

  private loadTurfDetails(): void {
    this.carouselService.getTurfDetails().subscribe(
      (data) => {
        console.log('turf datas');
        this.turfDetails = data.map((turf: any) => {
          turf.image1 = turf.image1 || turf.image || '';
          return turf;
        });
      },
      (error) => {
        console.error('Error fetching turf details:', error);
      }
    );
  }
}
