import { Routes } from '@angular/router';
import { Login } from './Pages/login/login';
export const routes: Routes = [
    { path: 'Login', component: Login },
    { path: '', redirectTo: 'Login', pathMatch: 'full'},
    { path: '**', redirectTo: 'Login' }
];
