import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegalosComponent } from './components/regalos/regalos.component';

// import { AuthService } from "./services/auth.service";

const APP_ROUTES: Routes = [
  // { path: 'login', component: LoginComponent },
  {
    path: 'inicio',
    component: HomeComponent,
    // canActivate: [AuthService]
  },
  {
    path: 'regalos',
    component: RegalosComponent,
    // canActivate: [AuthService]
  },
  {
    path: '**',
    pathMatch:'full',
    redirectTo: 'inicio'
  },
  {
    path: '',
    pathMatch:'full',
    redirectTo: 'inicio'
  }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
