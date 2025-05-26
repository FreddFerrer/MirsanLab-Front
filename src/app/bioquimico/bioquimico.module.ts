import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BioquimicoRoutingModule } from './bioquimico-routing.module';
import { BioquimicoComponent } from './bioquimico.component';
import { AgendaTurnosComponent } from './agenda-turnos/agenda-turnos.component';
import { SubirResultadosComponent } from './subir-resultados/subir-resultados.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BioquimicoComponent,
    AgendaTurnosComponent,
    SubirResultadosComponent
  ],
  imports: [
    CommonModule,
    BioquimicoRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
      BioquimicoComponent,
      AgendaTurnosComponent,
      SubirResultadosComponent
    ]
})
export class BioquimicoModule { }
