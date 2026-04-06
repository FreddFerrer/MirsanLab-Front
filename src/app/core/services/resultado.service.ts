import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Resultado } from 'src/app/shared/models/resultado.model';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private apiUrl = `${environment.apiUrl}/resultados`;

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
    const url = `${this.apiUrl}/${id}/descargar`;
    window.open(url, '_blank');
  }

  subirResultado(pacienteId: string, archivo: File): Observable<any> {
  const formData = new FormData();
  formData.append('pacienteId', pacienteId);
  formData.append('archivo', archivo);

  return this.postResultado(formData);
  }

  subirResultadoPorEmail(emailDestino: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('emailDestino', emailDestino);
    formData.append('archivo', archivo);

    return this.postResultado(formData);
  }

  private postResultado(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }
}
