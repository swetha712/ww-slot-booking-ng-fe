import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
export const routes: Routes = [
    
    { path: 'profile', component: UserProfileComponent },
    { path: 'edit-profile', component: UserDetailsComponent }
];
