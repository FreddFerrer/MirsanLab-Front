import { Component } from '@angular/core';

@Component({
  selector: 'app-historial-resultados',
  templateUrl: './historial-resultados.component.html',
  styleUrls: ['./historial-resultados.component.css']
})
export class HistorialResultadosComponent {
  resultados = [
    {
      id: 1,
      nombre: "Análisis de sangre completo",
      fecha: "15/05/2025",
      doctor: "Dra. Martínez, María",
      tipo: "Hematología",
      archivo: "analisis_sangre_completo_15052025.pdf"
    },
    {
      id: 2,
      nombre: "Perfil lipídico",
      fecha: "28/04/2025",
      doctor: "Dr. Gómez, Carlos",
      tipo: "Bioquímica",
      archivo: "perfil_lipidico_28042025.pdf"
    },
    {
      id: 3,
      nombre: "Análisis de orina",
      fecha: "10/04/2025",
      doctor: "Dra. Rodríguez, Ana",
      tipo: "Uroanálisis",
      archivo: "analisis_orina_10042025.pdf"
    },
    {
      id: 4,
      nombre: "Glucemia en ayunas",
      fecha: "02/04/2025",
      doctor: "Dr. Sánchez, Juan",
      tipo: "Bioquímica",
      archivo: "glucemia_ayunas_02042025.pdf"
    },
    {
      id: 5,
      nombre: "Hemograma completo",
      fecha: "15/03/2025",
      doctor: "Dra. Martínez, María",
      tipo: "Hematología",
      archivo: "hemograma_completo_15032025.pdf"
    },
    {
      id: 6,
      nombre: "Perfil tiroideo",
      fecha: "28/02/2025",
      doctor: "Dr. López, Roberto",
      tipo: "Endocrinología",
      archivo: "perfil_tiroideo_28022025.pdf"
    }
  ];

  filteredResultados = [...this.resultados];
  searchTerm = '';

  handleSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      this.filteredResultados = [...this.resultados];
    } else {
      this.filteredResultados = this.resultados.filter(r =>
        r.nombre.toLowerCase().includes(term) ||
        r.tipo.toLowerCase().includes(term) ||
        r.doctor.toLowerCase().includes(term)
      );
    }
  }
}
