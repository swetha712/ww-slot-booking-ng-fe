import { RouterOutlet } from '@angular/router';
import { CourtdetailsComponent } from "./courtdetails/courtdetails.component";
import { Component,OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { ThemeConflictService } from '../services/theme-conflict.service';
import { HeaderComponent } from "./header/header.component";
import { Apiservice } from '../services/apiservice.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CommonModule, CourtdetailsComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ww-slot-booking-app-fe';
}
