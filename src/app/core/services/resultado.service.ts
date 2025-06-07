import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from 'src/app/shared/models/resultado.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private apiUrl = '/api/resultados';

  constructor(private http: HttpClient) {}

  getResultados(): Observable<Resultado[]> {
  return this.http.get<any>(this.apiUrl).pipe(
    map(response => response.content as Resultado[])
  );}

  descargarResultado(id: number): Observable<Blob> {
    const url = `${this.apiUrl}/${id}/descargar`;
    return this.http.get(url, {
      responseType: 'blob'  
    });
  }

  abrirResultado(id: number): void {
    const url = `/api/resultados/${id}/descargar`;
    window.open(url, '_blank');
  }

  subirResultado(pacienteId: string, archivo: File): Observable<any> {
  const formData = new FormData();
  formData.append('pacienteId', pacienteId);
  formData.append('archivo', archivo);

  return this.http.post(`${this.apiUrl}`, formData);
}
}