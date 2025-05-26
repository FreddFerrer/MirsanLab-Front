import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './shared/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PatientComponent } from './patient/patient.component';
import { BioquimicoComponent } from './bioquimico/bioquimico.component';
import { HistorialResultadosComponent } from './patient/historial-resultados/historial-resultados.component';
import { ScheduleTurnoComponent } from './patient/schedule-turno/schedule-turno.component';
import { AgendaTurnosComponent } from './bioquimico/agenda-turnos/agenda-turnos.component';
import { SubirResultadosComponent } from './bioquimico/subir-resultados/subir-resultados.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AlreadyLoggedInGuard } from './core/guards/already-logged-in.guard';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'paciente-dashboard', component: PatientComponent , canActivate: [AuthGuard], data: { rol: 'PACIENTE' } },
  { path: 'admin-dashboard', component: BioquimicoComponent , canActivate: [AuthGuard], data: { rol: 'ADMIN' } },
  { path: 'resultados', component: HistorialResultadosComponent , canActivate: [AuthGuard] },
  { path: 'paciente-turnos', component: ScheduleTurnoComponent , canActivate: [AuthGuard] },
  { path: 'admin-turnos', component: AgendaTurnosComponent , canActivate: [AuthGuard] },
  { path: 'admin-subir-resultados', component: SubirResultadosComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
