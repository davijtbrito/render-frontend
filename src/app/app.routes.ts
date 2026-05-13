import { Routes } from '@angular/router';
import { RequestPage } from './request/request';

export const routes: Routes = [
  { path: '', redirectTo: '/request', pathMatch: 'full' },
  { path: 'request', component: RequestPage }
];
