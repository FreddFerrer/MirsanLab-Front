import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TurnoService, TurnoPendiente } from 'src/app/core/services/turno.service';

@Component({
  selector: 'app-bioquimico',
  templateUrl: './bioquimico.component.html'
})
export class BioquimicoComponent implements OnInit {
  nombreUsuario = localStorage.getItem('nombre') || '';
  rolUsuario = localStorage.getItem('rol') || '';
  turnosSemana: TurnoPendiente[] = [];
  fechaInicioSemana = '';
  fechaFinSemana = '';

  constructor(private router: Router, private turnoService: TurnoService) {}

  ngOnInit(): void {
    this.turnoService.getTurnosPendientes().subscribe({
      next: (data) => {
        const hoy = new Date();
        const inicioSemana = this.getLunes(hoy);
        const finSemana = new Date(inicioSemana);
        finSemana.setDate(inicioSemana.getDate() + 4);

        this.fechaInicioSemana = this.formatFecha(inicioSemana);
        this.fechaFinSemana = this.formatFecha(finSemana);

        // Filtra turnos de esta semana
        this.turnosSemana = data.filter(t => {
          const fechaTurno = new Date(t.fecha);
          return fechaTurno >= inicioSemana && fechaTurno <= finSemana;
        });
      }
    });
  }

  verTurnos(): void {
    this.router.navigate(['/admin-turnos']);
  }

  irASubirResultados(): void {
    this.router.navigate(['/admin-subir-resultados']);
  }

  private getLunes(fecha: Date): Date {
    const day = fecha.getDay();
    const diff = fecha.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(fecha.setDate(diff));
  }

  private formatFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0].split('-').reverse().join('/');
  }
}
