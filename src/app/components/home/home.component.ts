import { Component, inject } from '@angular/core';
import { HomeService } from '../../../services/home/home.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TurfCardComponent } from '../turf-card/turf-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,TurfCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
private service = inject(HomeService);
}
