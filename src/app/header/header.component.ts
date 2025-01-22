import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ThemeConflictService } from '../../services/theme-conflict.service';
import { ThemeService } from '../../services/theme.service';
import { Apiservice } from '../../services/apiservice.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatMenuModule
  ],
  providers: [ThemeConflictService, ThemeService, Apiservice],
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery:string = '';
  themes: any[] = [];
  fonts: string[] = [];
  selectedTheme: string = '';
  selectedFont: string = '';
  currentFont: string = '';
  user!: any; // Tracks the currently applied font
  userId!: string;

  constructor(
    private themeService: ThemeService,
    private themeConflictService: ThemeConflictService,
    private apiservice: Apiservice,
    private router: Router
  ) {}

  ngOnInit() {
    // Get themes and fonts from the ThemeConflictService
    this.themes = this.themeConflictService.getThemes();
    if (this.themes.length > 0) {
      this.selectedTheme = this.themes[0].name;
      this.fonts = this.themes[0].fonts; // Get fonts for the first theme
      this.selectedFont = this.fonts[0]; // Default to the first font
      this.currentFont = this.selectedFont; // Initialize currentFont
      this.themeService.switchTheme(this.selectedTheme);
      this.themeService.switchFont(this.selectedFont);
    }
    this.apiservice.getuser().subscribe((data: any) => {
      this.user = data;
      console.log(data);
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }


  performSearch(): void {
    console.log(`Searching for: ${this.searchQuery}`);
    // Navigate to the search component and pass the searchQuery as a query parameter
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

  onThemeChange(input: Event | string): void {
    let themeName: string;
    if (typeof input === 'string') {
      themeName = input;
    } else {
      const event = input as Event;
      themeName = (event.target as HTMLSelectElement).value;
    }
    this.selectedTheme = themeName;
  
    const themeDetails = this.themeConflictService.getThemeByName(themeName);
    if (themeDetails) {
      this.fonts = themeDetails.fonts;
      this.selectedFont = this.fonts[0];
      this.currentFont = this.selectedFont;
      this.themeService.switchTheme(themeName);
      this.themeService.switchFont(this.selectedFont);
    }
  }
  
  onFontChange(input: Event | string): void {
    let fontName: string;
  
    if (typeof input === 'string') {
      fontName = input;
    } else {
      const event = input as Event;
      fontName = (event.target as HTMLSelectElement).value;
    }
  
    this.selectedFont = fontName;
    this.currentFont = fontName;
    this.themeService.switchFont(fontName);
  }
  

  toggleTheme() {
    const currentIndex = this.themes.findIndex(
      (theme) => theme.name === this.selectedTheme
    );
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.selectedTheme = this.themes[nextIndex].name;

    const themeDetails = this.themes[nextIndex];
    if (themeDetails) {
      this.fonts = themeDetails.fonts;
      this.selectedFont = this.fonts[0]; // Reset to the first font of the new theme
      this.currentFont = this.selectedFont;
      this.themeService.switchTheme(this.selectedTheme);
      this.themeService.switchFont(this.selectedFont);
    }
  }

  toggleFont() {
    const currentIndex = this.fonts.findIndex((font) => font === this.selectedFont);
    const nextIndex = (currentIndex + 1) % this.fonts.length;
    this.selectedFont = this.fonts[nextIndex];
    this.currentFont = this.selectedFont;
    this.themeService.switchFont(this.selectedFont);
  }
}
