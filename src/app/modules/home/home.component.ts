import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

import { ThemeService } from '../../data/services/theme.service';
import { LanguageService } from '../../data/services/language.service';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  @ViewChildren('left, right') elements!: QueryList<ElementRef>;
  currentYear = new Date().getFullYear();

  private readonly phone = '573005469612';

  form = { name: '', email: '', subject: '', message: '' };
  sending = false;
  status: 'idle' | 'ok' | 'error' = 'idle';

  readonly directWhatsapp =
    `https://wa.me/573005469612?text=` +
    encodeURIComponent('Hola Antony, vi tu portafolio y me gustaría contactarte.');

  constructor(
    public lang: LanguageService,
    private themeService: ThemeService
  ) {
    this.themeService.initTheme();
  }

  get isValid(): boolean {
    return this.form.name.trim().length > 1
      && /\S+@\S+\.\S+/.test(this.form.email)
      && this.form.message.trim().length > 4;
  }

  async sendEmail(): Promise<void> {
    if (!this.isValid || this.sending) return;

    this.sending = true;
    this.status = 'idle';

    try {
      await emailjs.send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        {
          from_name: this.form.name,
          from_email: this.form.email,
          subject: this.form.subject || 'Sin asunto',
          message: this.form.message
        },
        { publicKey: environment.emailjs.publicKey }
      );

      this.status = 'ok';
      this.form = { name: '', email: '', subject: '', message: '' };
    } catch (err) {
      console.error('EmailJS error:', err);
      this.status = 'error';
    } finally {
      this.sending = false;
    }
  }

  sendToWhatsapp(): void {
    if (!this.isValid) return;

    const { name, email, subject, message } = this.form;

    const texto =
      `*Nuevo mensaje desde el portafolio*\n\n` +
      `*Nombre:* ${name}\n` +
      (email ? `*Email:* ${email}\n` : '') +
      (subject ? `*Asunto:* ${subject}\n` : '') +
      `\n${message}`;

    window.open(
      `https://wa.me/${this.phone}?text=${encodeURIComponent(texto)}`,
      '_blank'
    );
  }

  ngAfterViewInit(): void {
    this.initRevealObserver();
    this.initSideRevealObserver();
  }

  initRevealObserver() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.2 });

    reveals.forEach(el => observer.observe(el));
  }

  initSideRevealObserver() {
    const sides = document.querySelectorAll('.reveal-left, .reveal-right');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.25 });

    sides.forEach(el => observer.observe(el));
  }
}
