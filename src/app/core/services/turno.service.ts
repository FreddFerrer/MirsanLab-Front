import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Turno } from 'src/app/shared/models/turno-disponible.model';

export interface TurnoDisponible {
  fecha: string;
  horariosDisponibles: string[];
}

export interface TurnoPendiente {
  id: number;
  fecha: string;
  hora: string;
  estado: 'PENDIENTE' | 'REALIZADO' | 'CANCELADO';
  nombrePaciente: string;
  emailPaciente: string;
  telefonoPaciente: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'https://mirsanlab.site/api/turnos';

  constructor(private http: HttpClient) {}

  getTurnosDisponibles(): Observable<TurnoDisponible[]> {
    return this.http.get<TurnoDisponible[]>(`${this.apiUrl}?page=0&size=15`);
  }

  reservarTurno(turno: { fecha: string; hora: string }) {
  return this.http.post('https://mirsanlab.site/api/turnos', turno, {
    responseType: 'text'
  });
  }

  getTurnosPendientes(): Observable<TurnoPendiente[]> {
  return this.http.get<TurnoPendiente[]>(`${this.apiUrl}/pendientes`);
  }

  // PUT /api/turnos/{id}/realizar
  marcarComoRealizado(id: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}/realizar`, {});
  }

  // PUT /api/turnos/{id}/cancelar
  cancelarTurno(id: number): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  getProximoTurno(): Observable<Turno | null> {
  return this.http.get<Turno>('https://mirsanlab.site/api/turnos/proximo', { observe: 'response' }).pipe(
    map(response => response.status === 204 ? null : response.body),
    catchError(() => of(null))
  );
  }

  cancelarTurnoPaciente(id: number): Observable<void> {
  return this.http.put<void>(`https://mirsanlab.site/api/turnos/${id}/cancelar-paciente`, {});
  }

}
