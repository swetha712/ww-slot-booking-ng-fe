
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ThemeConflictService } from './theme-conflict.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: string = 'theme-set-1';

  constructor(
    rendererFactory: RendererFactory2,
    private themeConflictService: ThemeConflictService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  switchTheme(theme: string) {
    const themeDetails = this.themeConflictService.getThemeByName(theme);
    if (!themeDetails) {
      console.warn(`Theme ${theme} not found.`);
      return;
    }

    
    this.renderer.removeClass(document.body, this.currentTheme);

    
    this.renderer.addClass(document.body, theme);

    
    document.body.style.setProperty('--primary-color', themeDetails.primaryColor);
    document.body.style.setProperty('--secondary-color', themeDetails.secondaryColor);
    document.body.style.setProperty('--text-color', themeDetails.textColor);
    document.body.style.setProperty('--background-color', themeDetails.backgroundColor);
    document.body.style.setProperty('--success', themeDetails.success);
    document.body.style.setProperty('--success-text', themeDetails.successText);
    document.body.style.setProperty('--warn', themeDetails.warn);
    document.body.style.setProperty('--warn-text', themeDetails.warnText);
    document.body.style.setProperty('--danger', themeDetails.danger);
    document.body.style.setProperty('--danger-text', themeDetails.dangerText);
    
    this.currentTheme = theme;
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }
}
