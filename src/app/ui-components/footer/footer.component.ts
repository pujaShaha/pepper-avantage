import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isHomeScreen = false;

  constructor(private _router: Router){}

  ngOnInit(): void {
    const urlContainsWord = this._router.url.includes('home');
    this.isHomeScreen = urlContainsWord ? true : false;
  }
}
