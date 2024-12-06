// app.component.ts
import { Component, inject, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeService } from './theme.service';
import { DOCUMENT } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  //imports:[SidenavComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  constructor(private themeService: ThemeService, rendererFactory: RendererFactory2) {
    
  }

  onThemeChange(event: Event) {
    const selectedTheme = (event.target as HTMLSelectElement).value;
    this.themeService.switchTheme(selectedTheme);
  }

  changePrimary() {
    
    this.document.body.style.setProperty('--primary-color', '#fff');
  }
}
