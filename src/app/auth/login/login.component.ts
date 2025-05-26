import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginDto, AuthResponse } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.loginError = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto: LoginDto = {
      email: this.form.value.email,
      password: this.form.value.password
    };

    this.authService.login(dto).subscribe({
      next: (resp: AuthResponse) => {
        // Guarda token
        this.authService.setToken(resp.token);
        // Opcional: guarda nombre en localStorage
        localStorage.setItem('nombre', resp.nombre);
        localStorage.setItem('rol', resp.rol);
        this.authService.setToken(resp.token);

        // Redirige según rol
        if (resp.rol === 'ADMIN') {
          this.router.navigate(['/admin-dashboard'], { replaceUrl: true });
        } else {
          this.router.navigate(['/paciente-dashboard'], { replaceUrl: true });
        }
      },
      error: err => {
        if (err.status === 400 && err.error.message) {
          this.loginError = err.error.message;
        } else {
          this.loginError = 'Error de conexión. Intenta de nuevo.';
        }
      }
    });
  }
}
