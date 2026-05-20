import { Injectable } from '@angular/core';
import { UserInterface } from '../../interfaces/UserInterface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuarioActual: UserInterface | null = null;
  private usuarios: UserInterface[] = [
    {
      correo: 'jorgearmando177@gmail.com',
      rol: "admin",
      contrasena: '1234',
      telefono: '2283350039',
      nombreUsuario: 'Jorge Armando',
      apellidosUsuario: 'Fernandez Garcia',
      edad: 18,
      estaturaCm: 157,
      tipoCuerpo: 'Delgado',
      objetivo: 'Perder Peso',
      frecuenciaAsistencia: 'Ocacional (1 vez/semana)',
      tipoAlimentacion: 'Flexible / Sin plan especifico',
      frecuenciaCardiaca: 123,
      oxigenacion: 86,
      trofeos: 200,
      caloriasQuemadas: 2000,
      planActivo: true,
      rutinaActiva: {
        nombreLista: 'Quema Grasa',
        listaVideos: [
          {
            nombreVideo: 'Video 1',
            urlVideo: 'urlVideo',
            videoVisto: false,
            nombreCoach: 'Angeles',
          },
        ],
        imagenRutina: 'urlImagen',
      },
      asistencias: [
        {
          // Asistencia en 2025 (día 1)
          // NOTA: los meses en van de 0 a 11, 0 = Enero, 11 = Diciembre
          dia: 1,
          mes: 0, // Enero
          anio: 2025,
          tiempoCronometroSegundos: 1000, // > 0  se marca como actividad
          fechaAsistencia: undefined,
        },
        {
          // Asistencia en 2026
          dia: 14,
          mes: 0, // Enero
          anio: 2026,
          tiempoCronometroSegundos: 1000, // ROJO
          fechaAsistencia: undefined,
        },
        {
          // Asistencia en 2026
          dia: 15,
          mes: 0, // Enero
          anio: 2026,
          tiempoCronometroSegundos: 1000, // ROJO
          fechaAsistencia: undefined,
        },
      ],
      planAsociado: {
        nombrePlan: 'Plan EliteAthlete',
        descripcionPlan:
          'La experiencia completa. Acceso a rutinas avanzadas exclusivas, oxigenación en tiempo real, rankings dinámicos, recomendaciones inteligentes según desempeño y sistema de logros gamificado.',
        precioPlan: 499,
      },
      metodoPago: {
        nombreTarjeta: 'ejemplo numero 1',
        numeroTarjeta: '8282 8383 8383 8383',
        fechaExpiracion: '01/26',
        cvv: '123',
      },
      fechaCompraPlan: new Date('2025-01-01'),
      fechaExpiracionPlan: new Date('2027-01-01'),
    },
    {
      correo: 'prueba1@gmail.com',
      rol: "user",
      contrasena: '1234',
      telefono: '2283350039',
      nombreUsuario: 'Prueba',
      apellidosUsuario: 'Prueba1',
      edad: 18,
      estaturaCm: 157,
      tipoCuerpo: 'Delgado',
      objetivo: 'Perder Peso',
      frecuenciaAsistencia: 'Ocacional (1 vez/semana)',
      tipoAlimentacion: 'Flexible / Sin plan especifico',
      frecuenciaCardiaca: undefined,
      oxigenacion: undefined,
      trofeos: 50,
      caloriasQuemadas: undefined,
      planActivo: false,
      rutinaActiva: undefined,
      asistencias: undefined,
      planAsociado: undefined,
      metodoPago: undefined,
      fechaCompraPlan: undefined,
      fechaExpiracionPlan: undefined,
    },
    {
      correo: 'prueba2@gmail.com',
      contrasena: '1234',
      rol: "user",
      telefono: '2283350039',
      nombreUsuario: 'Prueba',
      apellidosUsuario: 'Prueba2',
      edad: 18,
      estaturaCm: 157,
      tipoCuerpo: 'Delgado',
      objetivo: 'Perder Peso',
      frecuenciaAsistencia: 'Ocacional (1 vez/semana)',
      tipoAlimentacion: 'Flexible / Sin plan especifico',
      frecuenciaCardiaca: 123,
      oxigenacion: 86,
      trofeos: 100,
      caloriasQuemadas: 2000,
      planActivo: true,
      rutinaActiva: undefined,
      asistencias: undefined,
      planAsociado: {
        nombrePlan: 'Plan PowerPlus',
        descripcionPlan:
          'Pensado para personas que ya entrenan de manera regular. Incluye rutinas personalizadas por objetivo, monitoreo avanzado de oxigenación, historial de progreso y ranking por categoría (fuerza, cardio, resistencia).',
        precioPlan: 349,
      },
      metodoPago: {
        nombreTarjeta: 'ejemplo numero 1',
        numeroTarjeta: '8282 8383 8383 8383',
        fechaExpiracion: '01/26',
        cvv: '123',
      },
      fechaCompraPlan: new Date('2024-01-01'),
      fechaExpiracionPlan: new Date('2025-01-01'),
    },
    {
      correo: 'prueba3@gmail.com',
      contrasena: '1234',
      rol: "user",
      telefono: '2283350039',
      nombreUsuario: 'Prueba',
      apellidosUsuario: 'Prueba3',
      edad: 18,
      estaturaCm: 157,
      tipoCuerpo: 'Delgado',
      objetivo: 'Perder Peso',
      frecuenciaAsistencia: 'Ocacional (1 vez/semana)',
      tipoAlimentacion: 'Flexible / Sin plan especifico',
      frecuenciaCardiaca: 123,
      oxigenacion: 86,
      trofeos: 200,
      caloriasQuemadas: 2000,
      planActivo: true,
      rutinaActiva: {
        nombreLista: 'Quema Grasa',
        listaVideos: [
          {
            nombreVideo: 'Video 1',
            urlVideo: 'urlVideo',
            videoVisto: false,
            nombreCoach: 'Angeles',
          },
        ],
        imagenRutina: 'urlImagen',
      },
      asistencias: [
        {
          // Asistencia en 2025 (día 1)
          // NOTA: los meses en van de 0 a 11, 0 = Enero, 11 = Diciembre
          dia: 1,
          mes: 0, // Enero
          anio: 2025,
          tiempoCronometroSegundos: 1000, // > 0  se marca como actividad
          fechaAsistencia: undefined,
        },
        {
          // Asistencia en 2026
          dia: 14,
          mes: 0, // Enero
          anio: 2026,
          tiempoCronometroSegundos: 1000, // ROJO
          fechaAsistencia: undefined,
        },
        {
          // Asistencia en 2026
          dia: 15,
          mes: 0, // Enero
          anio: 2026,
          tiempoCronometroSegundos: 1000, // ROJO
          fechaAsistencia: undefined,
        },
      ],
      planAsociado: {
        nombrePlan: 'Plan EliteAthlete',
        descripcionPlan:
          'La experiencia completa. Acceso a rutinas avanzadas exclusivas, oxigenación en tiempo real, rankings dinámicos, recomendaciones inteligentes según desempeño y sistema de logros gamificado.',
        precioPlan: 499,
      },
      metodoPago: {
        nombreTarjeta: 'ejemplo numero 1',
        numeroTarjeta: '8282 8383 8383 8383',
        fechaExpiracion: '01/26',
        cvv: '123',
      },
      fechaCompraPlan: new Date('2025-01-01'),
      fechaExpiracionPlan: new Date('2027-01-01'),
    },
    {
      correo: 'admin@gmail.com',
      contrasena: '1234',
      rol: "user",
      telefono: '2283350039',
      nombreUsuario: 'Administrador',
      apellidosUsuario: 'Gym',
      edad: 25,
      estaturaCm: 175,
      tipoCuerpo: 'Atlético',
      objetivo: 'Ganar Masa',
      frecuenciaAsistencia: '5 veces/semana',
      tipoAlimentacion: 'Alta proteína',
      frecuenciaCardiaca: 80,
      oxigenacion: 98,
      trofeos: 500,
      caloriasQuemadas: 10000,
      planActivo: true,
      rutinaActiva: undefined,
      asistencias: [],
      planAsociado: undefined,
      metodoPago: undefined,
      fechaCompraPlan: new Date('2025-01-01'),
      fechaExpiracionPlan: new Date('2027-01-01'),
    },
  ];

  constructor() {
    this.generarUsuarios();
  }

  generarUsuarios(): void {
    for (let i = 1; i <= 20; i++) {
      this.usuarios.push({
        correo: `usuario${i}@gmail.com`,
        contrasena: '1234',
        rol: "user",
        telefono: '2283350039',
        nombreUsuario: `Usuario${i}`,
        apellidosUsuario: `Apellido${i}`,
        edad: 18 + i,
        estaturaCm: 160 + i,
        tipoCuerpo: i % 2 === 0 ? 'Atlético' : 'Delgado',
        objetivo: i % 2 === 0 ? 'Ganar Masa' : 'Perder Peso',
        frecuenciaAsistencia: '3 veces/semana',
        tipoAlimentacion: 'Balanceada',
        frecuenciaCardiaca: 70 + i,
        oxigenacion: 96,
        trofeos: i * 50,
        caloriasQuemadas: i * 1000,
        planActivo: i % 2 === 0,
        rutinaActiva: undefined,
        asistencias: [],
        planAsociado: undefined,
        metodoPago: undefined,
        fechaCompraPlan: new Date('2025-01-01'),
        fechaExpiracionPlan: new Date('2027-01-01'),
      });
    }
  }

  obtenerUsuarioActual(): UserInterface | null {

  // Primero intenta memoria
  if (this.usuarioActual) {
    return this.usuarioActual;
  }

  // Luego localStorage
  const usuarioGuardado = localStorage.getItem('usuarioActual');

  if (usuarioGuardado) {

    this.usuarioActual = JSON.parse(usuarioGuardado);

    return this.usuarioActual;
  }

  return null;
}

  limpiarUsuarioActual(): void {
    this.usuarioActual = null;
  }

  buscarUsuario(correo: string, contrasena: string): UserInterface | undefined {
    return this.usuarios.find(
      (usuario) => usuario.correo === correo && usuario.contrasena === contrasena,
    );
  }

  agregarUsuario(usuario: UserInterface): void {
    this.usuarios.push(usuario);
  }
  obtenerUsuarios(): UserInterface[] {
  return this.usuarios;
}

  guardarUsuarioActual(usuario: UserInterface): void {
   this.usuarioActual = usuario;

  localStorage.setItem(
    'usuarioActual',
    JSON.stringify(usuario)
  );
  }
  cerrarSesion() {

  this.usuarioActual = null;

  localStorage.removeItem('usuarioActual');
}

  actualizarUsuario(usuarioActualizado: UserInterface): void {
    const index = this.usuarios.findIndex((u) => u.correo === usuarioActualizado.correo);

    if (index !== -1) {
      this.usuarios[index] = usuarioActualizado;
    }
  }
}
