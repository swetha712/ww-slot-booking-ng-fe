import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UserAuthComponent } from './app/user-auth/user-auth.component';


bootstrapApplication(UserAuthComponent, {
  providers: [
    provideAnimations(),// Enables animations
    provideRouter(routes),
    provideHttpClient()
    provideRouter(routes),
    provideHttpClient()
  ],
}).catch(err => console.error(err));
