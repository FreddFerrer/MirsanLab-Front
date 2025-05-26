import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const rolEsperado = route.data['rol'] as string;
    const rolActual = localStorage.getItem('rol');

    if (rolActual === rolEsperado) {
      return true;
    }

    // Si está logeado pero no tiene el rol correcto
    if (rolActual) {
      if (rolActual === 'ADMIN') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/paciente-dashboard']);
      }
    } else {
      // No está logeado
      this.router.navigate(['/login']);
    }

    return false;
  }
}
