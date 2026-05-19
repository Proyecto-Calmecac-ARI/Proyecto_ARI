// dashboard-admin.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.scss',
})
export class DashboardAdmin implements OnInit {

  vistaActual = 'dashboard';

  usuarios: UserInterface[] = [];

  totalUsuarios = 0;
  usuariosActivos = 0;
  usuariosInactivos = 0;
  totalCalorias = 0;

  evolucionDiaria = [
    {
      fecha: 'Lunes',
      calorias: 450,
      rutinas: 2,
      peso: 82
    },
    {
      fecha: 'Martes',
      calorias: 700,
      rutinas: 3,
      peso: 81.5
    },
    {
      fecha: 'Miércoles',
      calorias: 500,
      rutinas: 2,
      peso: 81
    },
    {
      fecha: 'Jueves',
      calorias: 900,
      rutinas: 4,
      peso: 80.7
    },
    {
      fecha: 'Viernes',
      calorias: 600,
      rutinas: 3,
      peso: 80.3
    }
  ];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {

    this.usuarios =
      this.userService.obtenerUsuarios();

    this.totalUsuarios =
      this.usuarios.length;

    this.usuariosActivos =
      this.usuarios.filter(
        u => u.planActivo
      ).length;

    this.usuariosInactivos =
      this.totalUsuarios -
      this.usuariosActivos;

    this.totalCalorias =
      this.usuarios.reduce(
        (acc, usuario) =>
          acc +
          (usuario.caloriasQuemadas || 0),
        0
      );
  }

  cambiarVista(vista: string) {

    this.vistaActual = vista;
  }

  enviarWhatsApp(usuario: UserInterface) {

    const mensaje = encodeURIComponent(`
🏋️ GYM APP
👤 Usuario: ${usuario.nombreUsuario}
🔥 Sigue entrenando
💪 No abandones tu rutina
🚀 La disciplina crea resultados
    `);

    window.open(
      `https://wa.me/5212283350039?text=${mensaje}`,
      '_blank'
    );
  }
}