import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from '../constants/pepper-advantage-constants';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _commonService: CommonService
  ){
    if (
      sessionStorage.getItem('email') &&
      sessionStorage.getItem('password')
    ) {
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('password');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      rememberMe: new FormControl(false)
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {
      this._commonService.authenticateUser(this.loginForm.value)
        ? this._router.navigateByUrl(CONSTANTS.home): ''
    } else {
    }
  }

}
