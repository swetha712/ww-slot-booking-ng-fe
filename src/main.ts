import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UserAuthComponent } from './app/user-auth/user-auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),// Enables animations
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
  
    RouterModule,  // Directly import RouterModule without forRoot
    {
      provide: 'APP_ROUTES',
      useValue: routes
    }
  ],
}).catch(err => console.error(err));
