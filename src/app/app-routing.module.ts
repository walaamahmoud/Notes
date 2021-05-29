import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  {path: "",redirectTo:"signin",pathMatch:"full"},
  {path:"signin", component: SignInComponent},
  {path: "signup", component: SignUpComponent},
  {path: "profile",canActivate:[AuthGuard],component: ProfileComponent},
  {path: "**", component: NotfoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],


exports: [RouterModule]
})
export class AppRoutingModule { }
