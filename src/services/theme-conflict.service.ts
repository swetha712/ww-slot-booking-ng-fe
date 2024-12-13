import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeConflictService {
  private primaryColors = ['#60b4da', '#167ed2', '#3f7eca', '#7c51eb', '#428376', '#826f5d', '#C6C6C6', '#00FFFF'];
  private secondaryColors = ['#314560', '#b360f3', '#1b83eb', '#483469', '#487149', '#ffa500', '#DDE1E9', '#BB86FC'];
  private textColors = ['#5494b4', '#06bbd2', '#7aa0ca', '#522fa4', '#5d985f', '#f3dbc2', '#5F7285', '#EDEDED'];
  private backgroundColors = ['#266789', '#e4f2fd', '#c5effc', '#EEE8F6', '#f1f7e9', '#121212', '#EBECF0', '#121212'];
  private successColors = ['#8af28f', '#66bb6a', '#afd9b3', '#80cbc4', '#66bb6a', '#3e581b', '#E8E9EF', '#03DAC6'];
  private successTextColors = ['#319153', '#35873b', '#578063', '#448c81', '#11533c', '#7fc782', '#02E375', '#FFFFFF'];
  private warnColors = ['#f9e99b', '#ffa827', '#ffd57f', '#ffb300', '#ffd600', '#978b08', '#E8E9EF', '#FFC107'];
  private warnTextColors = ['#c9aa4b', '#e57b0a', '#d1a94f', '#EA9100', '#f6b900', '#ffd600', '#FFC017', '#212121'];
  private dangerColors = ['#d35c5b', '#f44236', '#f5a9a9', '#f17f7f', '#f18b8c', '#c52203', '#E8E9EF', '#CF6679'];
  private dangerTextColors = ['#F7C6C5', '#9a354a', '#b15b5a', '#c24245', '#e26768', '#f18b8c', '#F5403D', '#EDEDED'];

  private fonts = ['Cormorant Garamond','play','Yuji Mai','Source Serif 4','Outfit', 'Ubuntu', 'Exo 2', 'Suravaram']; 

  private themes = this.primaryColors.map((primaryColor, index) => ({
    name: `theme-set-${index + 1}`,
    primaryColor,
    secondaryColor: this.secondaryColors[index],
    textColor: this.textColors[index],
    backgroundColor: this.backgroundColors[index],
    success: this.successColors[index],
    successText: this.successTextColors[index],
    warn: this.warnColors[index],
    warnText: this.warnTextColors[index],
    danger: this.dangerColors[index],
    dangerText: this.dangerTextColors[index],
    fonts: this.fonts, 
  }));

  getThemes() {
    return this.themes;
  }

  getThemeByName(name: string) {
    return this.themes.find((theme) => theme.name === name) || null;
  }
}
