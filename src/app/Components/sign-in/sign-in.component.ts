import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';



declare let $:any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isClicked = false;
  isLogged = false;
  
  constructor(private _AuthenticationService:AuthenticationService, private _Router:Router) { 

    if (this._AuthenticationService.isLoggedIn()) {
      this._Router.navigate(['/profile']);

    }
  }
  signIn = new FormGroup(
    {
      email : new FormControl(null,[Validators.required,Validators.email]),
      password : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])

    }
  );
  formData()
  {
    this.isClicked = true;
    if(this.signIn.valid)
    {
    
       this._AuthenticationService.signIn(this.signIn.value).subscribe( response =>
        {
          if(response.message = "success")
          {
            
            this.isClicked = false;
            localStorage.setItem("TOKEN",response.token);
            this._Router.navigate(['/profile']);
            this.isLogged = false;
          }
          
          
        });

    }  
  }
  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
