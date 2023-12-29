import { Injectable } from '@angular/core';
import { propertyDetails } from '../mock-data/mock-data';
import { Properties } from '../models/property-model';
import { BehaviorSubject } from 'rxjs';
import { CONSTANTS} from '../constants/pepper-advantage-constants';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  propertyInfo!: Properties[] | any;
  private properties = new BehaviorSubject<any>(this.propertyInfo);
  propertyInfo$ = this.properties.asObservable();

  constructor(private snackBar: MatSnackBar) { }

   /**
   * @description : To authenticate user with right credentials
   * @param loginForm : { email: string; password: string }
   * @returns : boolean
   */
   authenticateUser(loginForm: { email: string; password: string }): boolean {
    console.log('loginForm: ', loginForm);
    if (
      loginForm.email === CONSTANTS.userId &&
      loginForm.password === CONSTANTS.password
    ) {
      sessionStorage.setItem('email', loginForm.email);
      sessionStorage.setItem('password', loginForm.password);
      sessionStorage.setItem('userName', CONSTANTS.userName);
      return true;
    } else {
      return false;
    }
  }

  getPropertyDetails(): void {
    this.propertyInfo = propertyDetails.properties;
    this.properties.next(this.propertyInfo);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


}
