import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';

enableProdMode();

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient()],
}).catch((err) => console.error(err));
