import { Component } from '@angular/core';
import {LanguageService} from "../../data/services/language.service";
import {ThemeService} from "../../data/services/theme.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {ScrollService} from "../../data/services/scroll.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,
    RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuOpen = false;
  isDark = false;
  constructor(
    public theme: ThemeService,
    public lang: LanguageService,
    private scroll: ScrollService,
    private router: Router
  ) {}
  toggleTheme() {
    this.isDark = !this.isDark;

    document.documentElement.setAttribute(
      'data-theme',
      this.isDark ? 'dark' : 'light'
    );
  }
  navigate(section: string) {
    this.menuOpen = false;

    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        this.scroll.scrollTo(section);
      }, 50);
    });
  }
  setLang(lang: 'es' | 'en') {
    this.lang.setLanguage(lang);
    this.menuOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    this.menuOpen = false;
  }
}
