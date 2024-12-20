import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { TurfComponent } from './turf/turf.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { Component } from '@angular/core';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CarouselComponent } from './carousel/carousel.component';
export const routes: Routes = [
    { path: '', redirectTo: '/profile', pathMatch: 'full' },
    { path: 'profile', component: UserProfileComponent },
    { path: 'edit-profile', component: UserDetailsComponent },
    {path:'carousel',component:CarouselComponent}
];

  