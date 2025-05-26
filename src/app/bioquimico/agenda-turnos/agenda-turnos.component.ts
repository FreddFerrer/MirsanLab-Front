import { Component, OnInit } from '@angular/core';
import { TurnoService, TurnoPendiente } from 'src/app/core/services/turno.service';

@Component({
  selector: 'app-agenda-turnos',
  templateUrl: './agenda-turnos.component.html',
})
export class AgendaTurnosComponent implements OnInit {
  turnos: TurnoPendiente[] = [];
  cargando = true;
  error = '';
  successMsg = '';
  errorMsg = '';

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.turnoService.getTurnosPendientes().subscribe({
      next: (data) => {
        this.turnos = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'Error al cargar los turnos pendientes.';
        this.cargando = false;
      }
    });
  }

  marcarRealizado(id: number): void {
    this.turnoService.marcarComoRealizado(id).subscribe({
      next: () => {
        this.successMsg = 'Turno marcado como realizado.';
        this.turnos = this.turnos.filter(t => t.id !== id);
        this.limpiarMensajes();
      },
      error: () => {
        this.errorMsg = 'Ocurrió un error al marcar el turno como realizado.';
        this.limpiarMensajes();
      }
    });
  }

  cancelarTurno(id: number): void {
    this.turnoService.cancelarTurno(id).subscribe({
      next: () => {
        this.successMsg = 'Turno cancelado correctamente.';
        this.turnos = this.turnos.filter(t => t.id !== id);
        this.limpiarMensajes();
      },
      error: () => {
        this.errorMsg = 'Error al cancelar el turno.';
        this.limpiarMensajes();
      }
    });
  }

  private limpiarMensajes(): void {
    setTimeout(() => {
      this.successMsg = '';
      this.errorMsg = '';
    }, 3000);
  }
}
