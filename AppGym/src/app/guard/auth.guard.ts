import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Services/UserService';

export const authGuard: CanActivateFn = () => {

  const userService = inject(UserService);
  const router = inject(Router);

  // Obtener usuario actual
  const usuario = userService.obtenerUsuarioActual();

  // Si NO hay usuario logeado
  if (!usuario) {

    // Redirigir al login
    router.navigate(['/login'], {
      replaceUrl: true
    });

    return false;
  }

  // Si existe usuario
  return true;
};