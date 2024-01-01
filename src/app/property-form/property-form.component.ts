import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Properties } from '../models/property-model';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit{
  propertyForm!: FormGroup;
  rating: number = 0;
  image: any;
  files: File[] = [];
  imageUrl: any;
  isLoading = false;

constructor(
  private formBuilder: FormBuilder,
  private _router: Router,
  private datePipe: DatePipe,
  private _commonService: CommonService
  ) {}

ngOnInit(): void {
  this.propertyForm = this.formBuilder.group({
    amount: [null, [Validators.required]],
    category: [null, [Validators.required]],
    status:[null,[Validators.required]]
  });
}

navigateToHomePage() {
  this._router.navigateByUrl('/home');
}

onSubmit(){
  const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'dd.MM.yyyy');
    if (this.propertyForm?.valid && this.rating >0 && this.files.length) {
      const data = this.propertyForm.value;
      const newProperty: Properties = {
        postedDate: formattedDate,
        image: this.imageUrl,
        amount: '$' + data.amount,
        category:  data.category,
        reviews: this.rating,
        status: data.status,
      };
      this._commonService.savePropertyData(newProperty);
      this._commonService.openSnackBar(
        'Property Added successfully !!',
        'Close'
      );
      this.navigateToHomePage();
    }
    else {
      this._commonService.openSnackBar(
        'Please add neccessary details to submit the feedback form',
        'Close'
      );
    }
}


uploadImage() {
  this.isLoading = true;
  if(this.image) {
    setTimeout(() => {
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
      this.isLoading = false;
      }
    }, 1000);
  }
}

	onSelect(event: any) {
		this.files.push(...event.addedFiles);
    this.image = this.files[0];
	}

	onRemove(event: any) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  onRatingChanged(rating: any) {
    this.rating = rating;
  }
}
