import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from 'src/app/shared/models/resultado.model';


@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  private apiUrl = 'http://localhost:8080/api/resultados';

  constructor(private http: HttpClient) {}

  getResultados(): Observable<{ content: Resultado[] }> {
    return this.http.get<{ content: Resultado[] }>(this.apiUrl);
  }
}
