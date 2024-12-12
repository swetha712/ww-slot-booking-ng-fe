// app.component.ts
import { Component, inject, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeService } from './theme.service';
import { ThemeConflictService } from './theme-conflict.service';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from "./header/header.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    themes: any[] = [];
    fonts: string[] = [];
    selectedTheme: string = '';
    selectedFont: string = '';
    currentFont: string = ''; // Tracks the currently applied font
  
    constructor(
      private themeService: ThemeService,
      private themeConflictService: ThemeConflictService
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
    }
  
    onThemeChange(event: any) {
      const themeName = event.target.value;
      this.selectedTheme = themeName;
  
      const themeDetails = this.themeConflictService.getThemeByName(themeName);
      if (themeDetails) {
        this.fonts = themeDetails.fonts; // Update fonts for the new theme
        this.selectedFont = this.fonts[0]; // Default to the first font
        this.currentFont = this.selectedFont; // Update currentFont
        this.themeService.switchTheme(themeName);
        this.themeService.switchFont(this.selectedFont);
      }
    }
  
    onFontChange(event: any) {
      const fontName = event.target.value;
      this.selectedFont = fontName;
      this.currentFont = fontName; // Update currentFont when the font changes
      this.themeService.switchFont(fontName);
    }
  
    toggleTheme() {
      const currentIndex = this.themes.findIndex((theme) => theme.name === this.selectedTheme);
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
  