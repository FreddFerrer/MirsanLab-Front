import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './shared/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PatientComponent } from './patient/patient.component';
import { BioquimicoComponent } from './bioquimico/bioquimico.component';
import { HistorialResultadosComponent } from './patient/historial-resultados/historial-resultados.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'paciente-dashboard', component: PatientComponent },
  { path: 'admin-dashboard', component: BioquimicoComponent },
  { path: 'resultados', component: HistorialResultadosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
