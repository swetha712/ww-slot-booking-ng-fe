import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
// import { routes } from './app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),// Enables animations
    provideRouter(routes)
  ],
}).catch(err => console.error(err));
