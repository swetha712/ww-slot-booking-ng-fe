import { Component } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SidenavComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ww-slot-booking-app-fe';
}
