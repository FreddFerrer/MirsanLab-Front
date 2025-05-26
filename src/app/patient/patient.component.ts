import { Component, OnInit } from '@angular/core';
import { Resultado } from 'src/app/shared/models/resultado.model';
import { Turno } from 'src/app/shared/models/turno-disponible.model';
import { ResultadoService } from 'src/app/core/services/resultado.service';
import { TurnoService } from 'src/app/core/services/turno.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {
  nombreUsuario: string = localStorage.getItem('nombre') || '';
  rolUsuario: string = localStorage.getItem('rol') || '';

  ultimoResultado: Resultado | null = null;
  proximoTurno: Turno | null = null;

  successMsg: string | null = null;
  errorMsg: string | null = null;

  constructor(
    private resultadoService: ResultadoService,
    private turnoService: TurnoService
  ) {}

  ngOnInit(): void {
    this.resultadoService.getResultados().subscribe({
      next: (res) => {
        const resultados = res.sort((a, b) => new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime());
        this.ultimoResultado = resultados[0] || null;
      },
      error: () => {
        this.ultimoResultado = null;
      }
    });

    this.turnoService.getProximoTurno().subscribe({
      next: (turno) => {
        this.proximoTurno = turno;
      },
      error: () => {
        this.proximoTurno = null;
      }
    });
  }

  cancelarTurno(): void {
  if (!this.proximoTurno) return;

  this.turnoService.cancelarTurnoPaciente(this.proximoTurno.id).subscribe({
    next: () => {
      this.successMsg = 'Turno cancelado correctamente.';

      // Espera 2 segundos y luego oculta la card
      setTimeout(() => {
        this.successMsg = null;
        this.proximoTurno = null;
      }, 2000);
    },
    error: () => {
      this.errorMsg = 'Error al cancelar el turno.';
      setTimeout(() => this.errorMsg = null, 3000);
    }
    });
  }


}
