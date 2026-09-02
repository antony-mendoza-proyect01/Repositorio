import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {IntroComponent} from "./modules/intro/intro.component";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [RouterOutlet, NavbarComponent, IntroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio';

}
