import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  showLogoutMessage = false;
  userRole: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      // Leé el rol desde localStorage (solo si está logueado)
      this.userRole = status ? localStorage.getItem('rol') : null;
    });
  }

  goHome(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']); // landing
      return;
    }

    if (this.userRole === 'ADMIN') {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/paciente-dashboard']);
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