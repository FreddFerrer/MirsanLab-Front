import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { fromEvent, merge, of } from 'rxjs';
import { environment } from 'src/environment/environment';


export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  rol: string;
  nombre: string;
}

export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  isLoggedIn$ = merge(
    of(null), // inicial
    fromEvent(window, 'storage'), // en caso de que se cambie el token desde otro tab
    fromEvent(window, 'load')     // recarga del navegador
  ).pipe(
    startWith(null),
    map(() => !!localStorage.getItem('auth_token'))
);

  /** Hace login y devuelve el token + rol */
  login(dto: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, dto);
  }

  /** Registra un usuario; devuelve un 200 vacío si todo OK o un error con detalle */
  register(dto: RegisterDto): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, dto);
  }

  /** Guarda el token en localStorage */
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /** Recupera el token */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
