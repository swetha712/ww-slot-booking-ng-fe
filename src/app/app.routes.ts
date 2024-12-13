import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './components/home/home.component';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    {path:'home',component:HomeComponent},
    {path:'register',component:RegistrationComponent},
    {path:'registration',component:RegistrationComponent}
];
