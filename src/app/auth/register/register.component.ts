import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  // Para almacenar errores devueltos por la API
  apiErrors: { [field: string]: string } = {};
  generalError = '';
  successMessage = '';  

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        // Al menos una mayúscula y un número
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      ]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordsMatchValidator('password', 'confirmPassword')
    });
  }

  // Validador personalizado para que password y confirmPassword coincidan
  private passwordsMatchValidator(pwKey: string, confirmKey: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const pw = group.get(pwKey)?.value;
      const confirm = group.get(confirmKey)?.value;
      return pw === confirm ? null : { passwordsMismatch: true };
    };
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    // Resetea errores anteriores
    this.apiErrors = {};
    this.generalError = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { nombre, email, password, telefono } = this.form.value;

    this.authService.register({ nombre, email, password, telefono })
      .subscribe({
        next: () => {
          // En lugar de navegar inmediatamente, muestro alerta
          this.successMessage = 'Usuario registrado correctamente';
          this.form.reset();
          // Opcional: redirigir tras 2 segundos
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: err => {
          if (err.status === 400 && err.error.errors) {
            // Errores de validación: mapéalos a apiErrors
            this.apiErrors = { ...err.error.errors };
          } else if (err.status === 409) {
            // Email en uso u otro conflicto
            this.generalError = err.error.message;
          } else {
            this.generalError = 'Ocurrió un error inesperado. Intenta de nuevo.';
          }
        }
      });
  }

}
