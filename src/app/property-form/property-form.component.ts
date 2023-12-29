import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.scss']
})
export class PropertyFormComponent implements OnInit{
  propertyForm!: FormGroup;

constructor(
  private formBuilder: FormBuilder,
  private _router: Router
  ) {}

ngOnInit(): void {
  this.propertyForm = this.formBuilder.group({
    image: [null, [Validators.required,]],
    amount: [null, [Validators.required]],
    category: [null, [Validators.required]],
    feedback:[null,[Validators.required]],
    status:[null,[Validators.required]]
  });
}

navigateToHomePage() {
  this._router.navigateByUrl('/home');
}

onSubmit(){
  console.log('inside submit form');
}

onFileChange(event: any) {
  console.log('inside file change function', event);
}

uploadImage() {
  console.log('inside upload function');
}

files: File[] = [];

	onSelect(event: any) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event: any) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
}
