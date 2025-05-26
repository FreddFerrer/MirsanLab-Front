export interface Turno {
  id: number;
  fecha: string;         // e.g. "2025-05-27"
  hora: string;          // e.g. "08:30:00"
  pacienteNombre?: string;
  estado?: string;
}

export interface TurnoPaginadoResponse {
  content: Turno[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
