# MirsanLab

MirsanLab es una plataforma web para digitalizar la gestion de un laboratorio clinico.
Centraliza turnos, resultados y comunicacion entre pacientes y personal del laboratorio.

## Que problema resuelve

Muchos laboratorios gestionan turnos y resultados con procesos manuales o canales dispersos.
Eso genera demoras, errores de carga, poca trazabilidad y una mala experiencia para pacientes y equipo interno.

MirsanLab resuelve eso con un flujo unificado, simple y seguro.

## Las 2 partes del sistema

### 1) Frontend (este repositorio)

Aplicacion Angular para la experiencia de usuarios:

- Login y registro.
- Portal de paciente para consultar resultados y gestionar turnos.
- Panel administrativo/bioquimico para agenda y carga de resultados.
- Interfaz responsive para desktop y mobile.

### 2) Backend (API)  https://github.com/FreddFerrer/MirSanLab-Back.git

Servicio REST que concentra la logica de negocio:

- Autenticacion y autorizacion por token.
- Persistencia de usuarios, turnos y resultados.
- Validaciones del dominio.
- Envio de resultados por correo electronico.
- Seguridad y control de acceso por roles.

Nota: este repositorio contiene solo el frontend. El backend se mantiene en su propio proyecto.

## Capacidades principales

- Registro e inicio de sesion por rol.
- Reserva y cancelacion de turnos por parte del paciente.
- Visualizacion de turnos pendientes en panel admin.
- Carga de resultados en PDF.
- Envio de resultados por email.
- Consulta y descarga de resultados desde el portal.

## Ejecucion local del frontend

### Requisitos

- Node.js 18 o superior
- npm

### Instalar dependencias

```bash
npm install
```

### Levantar en desarrollo

```bash
npm start
```

Frontend disponible en: `http://localhost:4200`

### Build

```bash
npm run build
```

### Tests

```bash
npm test
```
