// app.component.ts
import { Component,OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { ThemeConflictService } from '../services/theme-conflict.service';
import { HeaderComponent } from "./header/header.component";
import { Apiservice } from '../services/apiservice.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CommonModule, UserAuthComponent,RouterOutlet,RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Apiservice]
  
})
export class AppComponent implements OnInit {
    title(title: any) {
      throw new Error('Method not implemented.');
    }
    themes: any[] = [];
    fonts: string[] = [];
    selectedTheme: string = '';
    selectedFont: string = '';
    currentFont: string = ''; 
    user!:any;// Tracks the currently applied font
  
    constructor(
      private themeService: ThemeService,
      private themeConflictService: ThemeConflictService,
      private apiservice:Apiservice
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
    this.apiservice.getuser().subscribe((data:any)=>{
this.user=data;
console.log(data);
    })
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
  