import { Injectable } from '@angular/core';
import { translations } from './i18n';


type Lang = 'es' | 'en';
type TranslationKey = keyof typeof translations.es;

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  lang: Lang = 'es';

  initLanguage() {
    const saved = localStorage.getItem('lang') as Lang | null;
    this.lang = saved ?? 'es';
  }

  setLanguage(lang: Lang) {
    this.lang = lang;
    localStorage.setItem('lang', lang);
  }

  t(key: TranslationKey): string {
    return translations[this.lang][key];
  }
  constructor() { }
}
