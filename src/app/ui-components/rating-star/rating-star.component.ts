import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent implements OnInit{
  @Input() rating: number | any = 0;
  @Input() starCount: number | any = 5;
  @Output() ratingUpdated = new EventEmitter();
  isUserOnFormModule = false;

  ratingArr: Array<number> = [];

  constructor(private _router: Router) {
    this.isUserOnFormModule = this._router.url.includes('property-form');
  }

  ngOnInit() {
    this.ratingArr = Array(this.starCount).fill(0);
  }
  onClick(rating: number) : boolean {
    if(this.isUserOnFormModule) {
      this.rating = rating;
    }
    this.ratingUpdated.emit(rating);
    return false;
  }
}
