import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { RegistrationComponent } from './registration/registration.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    {path:'home',component:HomeComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'contact',component:ContactComponent},
    {path:'registration',component:RegistrationComponent}
];
