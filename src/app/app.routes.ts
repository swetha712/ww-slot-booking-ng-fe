import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



import { HeaderComponent } from './header/header.component';
export const routes: Routes = [
    { path: '', redirectTo: '/profile', pathMatch: 'full' },
    { path: 'profile', component: UserProfileComponent },
    { path: 'edit-profile', component: UserDetailsComponent }
];

  