import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeConflictService {
  private primaryColors = ['#aee6b0', '#aac79b','#D1DADA', '#e9dcfa', '#428376', '#D9CDC1', '#C6C6C6', '#e3acac','#494e5c'];
  private secondaryColors = ['#A8D3AA', '#738769', '#E3E8E9','#dcc9f5', '#487149', '#AAAAAA', '#DDE1E9', '#C2A1A0','#777e91'];
  private textColors = ['#E4F2FD', '#06bbd2', '#7aa0ca', '#522fa4', '#5d985f', '#f3dbc2', '#5F7285', '#EDEDED','#ffffff'];
  private backgroundColors = ['#C4E1C5', '#95ad89', '#EBEBEB', '#EEE8F6', '#f1f7e9', '#FFFFFF', '#EBECF0', '#fce8e8','#333742'];
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
