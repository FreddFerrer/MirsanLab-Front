import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-subir-resultados',
  templateUrl: './subir-resultados.component.html',
})
export class SubirResultadosComponent implements OnInit {
  pacienteInput = new FormControl('');
  pacientesFiltrados: any[] = [];
  pacienteSeleccionado: any = null;
  successMsg: string | null = null;
  errorMsg: string | null = null;


  archivoSeleccionado: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  this.pacienteInput.valueChanges
    .pipe(
      // Filtrar nulls
      filter((value): value is string => value !== null && value.trim() !== ''),
      debounceTime(300),
      switchMap((value: string) => {
        const params = new HttpParams().set('query', value);
        return this.http.get<any[]>('https://mirsanlab.site/api/usuarios/buscar', { params });
      })
    )
    .subscribe((resultados) => {
      this.pacientesFiltrados = resultados || [];
    });
}


  seleccionarPaciente(paciente: any): void {
    this.pacienteSeleccionado = paciente;
    this.pacienteInput.setValue(paciente.nombre);
    this.pacientesFiltrados = [];
  }

  eliminarSeleccion(): void {
    this.pacienteSeleccionado = null;
    this.pacienteInput.setValue('');
    this.archivoSeleccionado = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.archivoSeleccionado = file;
    } else {
      this.archivoSeleccionado = null;
      alert('Por favor seleccione un archivo PDF válido.');
    }
  }

  subirArchivo(): void {
  if (!this.pacienteSeleccionado || !this.archivoSeleccionado) return;

  const formData = new FormData();
  formData.append('pacienteId', this.pacienteSeleccionado.id.toString());
  formData.append('archivo', this.archivoSeleccionado);

  this.http.post('https://mirsanlab.site/api/resultados', formData).subscribe({
    next: () => {
      this.successMsg = 'Resultado subido correctamente.';
      this.errorMsg = null;
      this.archivoSeleccionado = null;

      // Limpiar paciente
      this.pacienteSeleccionado = null;
      this.pacienteInput.setValue('');
      this.pacientesFiltrados = [];

      // Ocultar mensaje luego de 3 segundos
      setTimeout(() => {
        this.successMsg = null;
      }, 3000);
    },
    error: (err) => {
      this.successMsg = null;
      this.errorMsg = 'Error al subir el resultado. Verifique los datos.';

      // Ocultar mensaje de error también
      setTimeout(() => {
        this.errorMsg = null;
      }, 4000);
    }
  });
}
}
