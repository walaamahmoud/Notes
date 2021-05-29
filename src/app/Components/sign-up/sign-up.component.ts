import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

declare let $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  hover =false;
  isClicked = false;
  isSuccess =false;
  isRegistered = false;
  responseMessage = "";
  errorMessage = "";

  constructor(private _AuthenticationService:AuthenticationService,private _Router:Router) { 
    
  }
  
  signUp = new FormGroup(
    {
      first_name : new FormControl(null,[Validators.required, Validators.minLength(3),Validators.maxLength(10)] ),
      last_name : new FormControl(null, [Validators.required ,Validators.minLength(3),Validators.maxLength(10)] ),
      age: new FormControl(null,[Validators.required,Validators.min(10),Validators.max(80)]),
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])

    }
  );
  formData()
  {
    this.isClicked = true;
    if(this.signUp.valid)
    {
       this._AuthenticationService.signUp(this.signUp.value).subscribe( response =>
        {
          if(response.message=="success")
          {
            this.isClicked = false;
            this.isSuccess = true; 
            this.isRegistered = false;
            this.responseMessage = response.message; 
            this._Router.navigate(['/signin']);

          }
          else
          {
            this.isClicked = false;
            this.isSuccess = false ; 
            this.isRegistered = true;
            this.errorMessage = response.errors.email.message;
            

          }
  
        });
     
    }
    
  }
  ngOnInit(): void {
    $('#signUp').particleground();
  }

}
