import { Component } from '@angular/core';

@Component({
  selector: 'app-bioquimico',
  templateUrl: './bioquimico.component.html',
  styleUrls: ['./bioquimico.component.css']
})
export class BioquimicoComponent {
  nombreUsuario = localStorage.getItem('nombre') || 'Bioquímico';
  rolUsuario = localStorage.getItem('rol') || 'BIOQUIMICO';
}
