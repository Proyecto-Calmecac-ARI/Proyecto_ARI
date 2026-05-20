import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
import { Reproductor } from './Pages/reproductor/reproductor';
import { Dasboard } from './Pages/dasboard/dasboard';
import { Formulario } from './Pages/formulario/formulario';
import { DashboardAdmin } from './Components/dashboard-admin/dashboard-admin';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'formulario', component: Formulario },
  {
    path: 'dashboard',
    component: Dasboard,
    canActivate: [authGuard]
  },
  {
    path: 'reproductor',
    component: Reproductor,
    canActivate: [authGuard]
  },
  {
    path: 'dashboardAdmin',
    component: DashboardAdmin,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
