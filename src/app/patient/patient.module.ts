import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientComponent } from './patient.component';
import { ScheduleTurnoComponent } from './schedule-turno/schedule-turno.component';
import { HistorialResultadosComponent } from './historial-resultados/historial-resultados.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PatientComponent,
    ScheduleTurnoComponent,
    HistorialResultadosComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    PatientComponent,
    HistorialResultadosComponent,
    ScheduleTurnoComponent
  ]
})
export class PatientModule { }
