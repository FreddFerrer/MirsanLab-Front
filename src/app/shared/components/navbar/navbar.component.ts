import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  showLogoutMessage = false;
  userRole: string | null = null;
  currentRoute: string = '';
  menuAbierto = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      this.userRole = status ? localStorage.getItem('rol') : null;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.menuAbierto = false; 
      }
    });
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  goHome(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    } else if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/paciente-dashboard']);
    }
  }

  irAResultados(): void {
    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin-subir-resultados']);
    } else {
      this.router.navigate(['/resultados']);
    }
  }

  irATurnos(): void {
    if (!this.isLoggedIn) return;

    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin-turnos']);
    } else {
      this.router.navigate(['/paciente-turnos']);
    }
  }

  logout(): void {
    this.authService.logout();
    this.showLogoutMessage = true;
    setTimeout(() => {
      this.showLogoutMessage = false;
      this.router.navigate(['/login']);
    }, 2000);
  }
}
