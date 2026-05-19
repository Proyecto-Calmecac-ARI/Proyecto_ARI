import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Reproductor } from './Pages/reproductor/reproductor';
import { Dasboard } from './Pages/dasboard/dasboard';
import { Formulario } from './Pages/formulario/formulario';
import { DashboardAdmin } from './Components/dashboard-admin/dashboard-admin';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'formulario', component: Formulario },
  { path: 'dashboard', component: Dasboard },
  { path: 'reproductor', component: Reproductor },
  { path: 'dashboardAdmin', component: DashboardAdmin},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
