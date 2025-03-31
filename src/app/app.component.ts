import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit() {
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.setTheme(prefersDark);

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        console.log('Theme toggle button clicked');
        const isDark = document.body.classList.toggle('dark');
        this.setTheme(isDark);
      });
    }
  }

  setTheme(isDark: boolean) {
    const themeIcon = document.getElementById(
      'themeIcon'
    ) as HTMLIonIconElement;
    document.body.classList.toggle('dark', isDark);
    themeIcon.name = isDark ? 'moon' : 'sunny';
  }
}