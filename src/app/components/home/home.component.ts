import { Component, inject } from '@angular/core';
import { HomeService } from '../../../services/home/home.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurfCardComponent } from '../turf-card/turf-card.component';
import { HeaderComponent } from '../../header/header.component';
import { CarouselComponent } from '../../carousel/carousel.component';
import { BottomNavComponent } from '../../bottom-nav/bottom-nav.component';
import { Apiservice } from '../../../services/apiservice.service';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, CarouselComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
private service = inject(HomeService);
turfDetails: any[] = [];
filteredTurfs: any[] = [];
searchMessage: string = '';

sample:any[]=[];


constructor(private apiService: Apiservice ,private router:RouterOutlet) {}

ngOnInit(): void {
  this.apiService.getTurfDetails().subscribe((data) => {
    this.turfDetails = data;
    console.log('turfdetails=======',this.turfDetails);
    this.filteredTurfs = this.turfDetails.slice(0, 4);
  });

  this.apiService.getExample().subscribe((data)=>{
    this.sample=data;
  })
}

onSearch(query: string): void {
  if (query.trim()) {
    this.filteredTurfs = this.turfDetails.filter((turf) =>
      turf.name.toLowerCase().includes(query.toLowerCase())
    );

    if (this.filteredTurfs.length === 0) {
      this.searchMessage = `Turf name "${query}" not found.`;
      this.filteredTurfs = this.turfDetails;
    } else {
      this.searchMessage = '';
    }
  } else {
    this.filteredTurfs = this.turfDetails.slice(0, 4);
    this.searchMessage = '';
  }
}
}
