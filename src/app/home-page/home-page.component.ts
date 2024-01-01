import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { Properties } from '../models/property-model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  propertyInformation! : Properties[] | any;
  userName = sessionStorage.getItem('userName');

  constructor(
    private _commonService: CommonService,
    private _router: Router
    ){}


  ngOnInit(): void {
    this._commonService.getPropertyDetails();
    this.getPropertyDetails();
  }

  getPropertyDetails() {
    this._commonService.propertyInfo$.subscribe((resp:Properties[] )=> {
     if(resp) {
      this.propertyInformation = resp;
     }
    }, 
    (error) => {
      console.log('Error while fetching details', error);
    }
    )
  }

  addNewProperty() {
    this._router.navigateByUrl('/property-form');
  }

  editPropertyDetails(property: Properties){
    this._router.navigateByUrl('/property-form');
  }

}
