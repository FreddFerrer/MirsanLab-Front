import { Component, OnInit } from '@angular/core';
import { ResultadoService } from 'src/app/core/services/resultado.service';
import { Resultado } from 'src/app/shared/models/resultado.model';

@Component({
  selector: 'app-historial-resultados',
  templateUrl: './historial-resultados.component.html',
})
export class HistorialResultadosComponent implements OnInit {
  resultados: Resultado[] = [];
  cargando = true;

  constructor(private resultadoService: ResultadoService) {}

  ngOnInit(): void {
    this.resultadoService.getResultados().subscribe({
      next: (resp) => {
        this.resultados = resp.content;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  descargar(archivoUrl: string): void {
    const baseUrl = 'http://localhost:8080/';
    const urlCompleta = baseUrl + archivoUrl.replace(/\\/g, '/');
    window.open(urlCompleta, '_blank');
  }
}
