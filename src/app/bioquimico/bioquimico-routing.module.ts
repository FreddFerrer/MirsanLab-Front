import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BioquimicoComponent } from './bioquimico.component';

const routes: Routes = [{ path: '', component: BioquimicoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BioquimicoRoutingModule { }
