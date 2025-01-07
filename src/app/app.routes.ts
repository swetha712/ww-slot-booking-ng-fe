import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HeaderComponent } from './header/header.component';
import { TurfComponent } from './turf/turf.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { Component } from '@angular/core';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CourtdetailsComponent } from './courtdetails/courtdetails.component';
import { BottomNavComponent } from './bottom-nav/bottom-nav.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './search/search.component';
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'profile', component: UserProfileComponent },
    { path: 'edit-profile', component: UserDetailsComponent },
    { path: 'turfdetails/:id', component: TurfComponent },
    {path:'orderdetails',component:OrderDetailsComponent},
    {path :'login',component:UserAuthComponent},
    {path:'court',component:CourtdetailsComponent},
    {path:'bottomnav',component:BottomNavComponent},
    {path:'carousel',component:CarouselComponent},
    {path:'home',component:HomeComponent},
    {path:'user-details',component:UserDetailsComponent},
];