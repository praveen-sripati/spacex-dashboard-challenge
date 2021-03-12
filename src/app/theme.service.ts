import { Injectable } from '@angular/core';

export const darkTheme = {
  'primary-color': '#181818',
  'secondary-color': '#212121',
  'text-color': 'rgba(255, 255, 255, 0.8)',
  'border-color': '#282828',
  'box-shadow-color': '#282828',
  'table-head-color': '#212121',
  'table-border-color': '#282828',
  'table-body-color': '#282828',
  'cdk-element-color': '#383838',
  'calendar-background': '#484848',
  'calendar-border': 'transparent',
  'calendar-hover': '#282828',
  'theme-button-color': '#FED000'
};

export const lightTheme = {
  'primary-color': '#fff',
  'secondary-color': '#ffffff',
  'text-color': '#2d2d2d',
  'border-color': '#dcdcdc',
  'box-shadow-color': '#ececec',
  'table-head-color': '#dcdcdc',
  'table-border-color': '#dcdcdc',
  'table-body-color': '#fff',
  'cdk-element-color': '#fff',
  'calendar-background': '#fff',
  'calendar-border': '#fff',
  'calendar-hover': '#eee',
  'theme-button-color': '#4cc9f0'
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  toggleDark() {
    this.setTheme(darkTheme);
  }

  toggleLight() {
    this.setTheme(lightTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }
}
