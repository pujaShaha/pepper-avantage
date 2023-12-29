import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn = false;

  constructor(private _router: Router){}

  ngOnInit(): void {
    const urlContainsWord = this._router.url.includes('login');
    this.isUserLoggedIn = !urlContainsWord ? true : false;
  }

}
