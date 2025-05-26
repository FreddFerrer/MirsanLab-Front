import { Component, OnInit } from '@angular/core';
import { TurnoService, TurnoDisponible } from 'src/app/core/services/turno.service';

@Component({
  selector: 'app-schedule-turno',
  templateUrl: './schedule-turno.component.html'
})
export class ScheduleTurnoComponent implements OnInit {
  turnos: TurnoDisponible[] = [];
  fechaSeleccionada: string | null = null;
  horarioSeleccionado: string | null = null;

  successMsg: string = '';
  errorMsg: string = '';

  constructor(private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.turnoService.getTurnosDisponibles().subscribe({
      next: (data) => {
        this.turnos = data;
      },
      error: () => {
        console.error('Error al obtener turnos disponibles');
      }
    });
  }

  seleccionarFecha(fecha: string) {
    this.fechaSeleccionada = fecha;
    this.horarioSeleccionado = null;
    this.clearMessages();
  }

  seleccionarHorario(hora: string) {
    this.horarioSeleccionado = hora;
    this.clearMessages();
  }

  obtenerHorariosSeleccionados(): string[] {
    const turno = this.turnos.find(t => t.fecha === this.fechaSeleccionada);
    return turno ? turno.horariosDisponibles : [];
  }

  confirmarTurno() {
    if (!this.fechaSeleccionada || !this.horarioSeleccionado) return;

    const turno = {
      fecha: this.fechaSeleccionada,
      hora: this.horarioSeleccionado
    };

    this.turnoService.reservarTurno(turno).subscribe({
      next: () => {
        this.successMsg = `Turno reservado para ${this.formatearFecha(this.fechaSeleccionada!)} a las ${this.horarioSeleccionado}`;
        this.fechaSeleccionada = null;
        this.horarioSeleccionado = null;

        setTimeout(() => {
        window.location.reload();
        }, 2000);
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error al reservar el turno.';
      }
    });
  }

  formatearFecha(fechaISO: string): string {
  // Parse manual sin zona horaria
  const [año, mes, dia] = fechaISO.split('-').map(Number);
  const fecha = new Date(año, mes - 1, dia); // mes empieza en 0

  return fecha.toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
    });
  }


  clearMessages() {
    this.successMsg = '';
    this.errorMsg = '';
  }
}
