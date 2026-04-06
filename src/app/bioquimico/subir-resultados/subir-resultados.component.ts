import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import { ResultadoService } from 'src/app/core/services/resultado.service';

@Component({
  selector: 'app-subir-resultados',
  templateUrl: './subir-resultados.component.html',
  styleUrls: ['./subir-resultados.component.css']
})
export class SubirResultadosComponent {
  correoDestino = new FormControl('', [Validators.required, Validators.email]);
  archivoSeleccionado: File | null = null;
  nombreArchivo = '';
  successMsg: string | null = null;
  errorMsg: string | null = null;
  enviando = false;
  private popupTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private resultadoService: ResultadoService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (!file) {
      this.archivoSeleccionado = null;
      this.nombreArchivo = '';
      return;
    }

    if (file.type !== 'application/pdf') {
      this.archivoSeleccionado = null;
      this.nombreArchivo = '';
      this.showError('Selecciona un archivo PDF valido.');
      return;
    }

    this.archivoSeleccionado = file;
    this.nombreArchivo = file.name;
    this.errorMsg = null;
  }

  subirArchivo(): void {
    if (this.correoDestino.invalid || !this.archivoSeleccionado || this.enviando) {
      this.correoDestino.markAsTouched();
      return;
    }

    this.enviando = true;
    this.errorMsg = null;
    this.successMsg = null;

    const email = this.correoDestino.value?.trim() || '';

    this.resultadoService.subirResultadoPorEmail(email, this.archivoSeleccionado).subscribe({
      next: () => {
        this.enviando = false;
        this.showSuccess('Resultado enviado correctamente al correo de destino.');
        this.archivoSeleccionado = null;
        this.nombreArchivo = '';
        this.correoDestino.reset('');
      },
      error: (error: HttpErrorResponse) => {
        this.enviando = false;
        this.showError(this.buildErrorMessage(error));
      }
    });
  }

  closePopup(): void {
    this.successMsg = null;
    this.errorMsg = null;
    this.clearPopupTimeout();
  }

  private showSuccess(message: string): void {
    this.errorMsg = null;
    this.successMsg = message;
    this.schedulePopupClose();
  }

  private showError(message: string): void {
    this.successMsg = null;
    this.errorMsg = message;
    this.schedulePopupClose();
  }

  private schedulePopupClose(): void {
    this.clearPopupTimeout();
    this.popupTimeoutId = setTimeout(() => {
      this.successMsg = null;
      this.errorMsg = null;
      this.popupTimeoutId = null;
    }, 5000);
  }

  private clearPopupTimeout(): void {
    if (this.popupTimeoutId) {
      clearTimeout(this.popupTimeoutId);
      this.popupTimeoutId = null;
    }
  }

  private buildErrorMessage(error: HttpErrorResponse): string {
    const backendMessage = this.extractBackendMessage(error.error);
    if (backendMessage) {
      return `No se pudo enviar el resultado: ${backendMessage}`;
    }

    if (error.status === 0) {
      return 'No se pudo enviar el resultado: sin conexion con el servidor.';
    }

    return `No se pudo enviar el resultado (HTTP ${error.status}).`;
  }

  private extractBackendMessage(errorBody: unknown): string | null {
    if (!errorBody) {
      return null;
    }

    if (typeof errorBody === 'string') {
      return errorBody.trim() || null;
    }

    if (typeof errorBody === 'object') {
      const possible = errorBody as { message?: string; error?: string; detail?: string };
      return (
        possible.message?.trim() ||
        possible.error?.trim() ||
        possible.detail?.trim() ||
        null
      );
    }

    return null;
  }
}
