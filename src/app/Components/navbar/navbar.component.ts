import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public _AuthenticationService:AuthenticationService,private _Router:Router) {

   
   }
  logout()
  {
    localStorage.clear();
    this._Router.navigate(['/signin']);
  }
  ngOnInit(): void {
  }

}
