import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  imports: [MatButtonModule, MatIconModule],
})
export class BottomNavComponent {
  isHidden = false;
  private lastScrollY = 0;

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollY = window.scrollY;

    // If scrolling down, hide the navbar; if scrolling up, show it
    if (currentScrollY > this.lastScrollY) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }
}
