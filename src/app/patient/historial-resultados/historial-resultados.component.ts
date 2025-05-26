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
    next: (resultados) => {
      this.resultados = resultados;
      this.cargando = false;
    },
    error: () => {
      this.cargando = false;
    }
  });
}

  descargar(id: number): void {
  this.resultadoService.descargarResultado(id).subscribe({
    next: (blob) => {
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `resultado_${id}.pdf`; // o cualquier nombre
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
    },
      error: (err) => {
        console.error('❌ Error al descargar el archivo:', err);
      }
    });
  }


}
