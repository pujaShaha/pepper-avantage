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
  console.log('inside submit form', this.propertyForm);

  const currentDate = new Date();
    const formattedDate = this.datePipe.transform(currentDate, 'dd.MM.yyyy');
    if (this.propertyForm?.valid && this.rating >0 && this.files.length) {
      const data = this.propertyForm.value;
      console.log('data: ', data);
      const newProperty: Properties = {
        postedDate: formattedDate,
        image: '',
        amount: data.amount,
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

// onFileChange(event: any) {
//   this.image = event.targets.files[0];
//   console.log('image: ', this.image);
//   console.log('inside file change function', event.targets.files[0]);
// }

uploadImage() {
  let formData = new FormData();
  formData.set('file', this.image);
  console.log('formData: ', formData);
  console.log('inside upload function');
}

	onSelect(event: any) {
		console.log(event);
		this.files.push(...event.addedFiles);
    console.log('this.files: ', this.files);
    this.image = event.addedFiles[0];
    console.log('image: ', this.image);
	}

	onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}

  onRatingChanged(rating: any) {
    this.rating = rating;
  }
}
