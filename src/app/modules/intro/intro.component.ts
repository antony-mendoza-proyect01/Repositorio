import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent implements OnInit{
  hideIntro = false;


  ngOnInit(): void {
    setTimeout(() => {
      this.hideIntro = true;
    }, 4500); // 3.5 segundos
  }
  // ngOnInit(): void {
  //   const seen = sessionStorage.getItem('introSeen');
  //
  //   if (seen) {
  //     this.hideIntro = true;
  //     return;
  //   }
  //
  //   setTimeout(() => {
  //     this.hideIntro = true;
  //     sessionStorage.setItem('introSeen', 'true');
  //   }, 3500); // 3.5 segundos
  // }
}
