// dashboard-admin.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';
import { AccesibilidadService } from '../../Services/accesibilidad.service';
import { HttpClient } from '@angular/common/http';

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
      peso: 82,
    },
    {
      fecha: 'Martes',
      calorias: 700,
      rutinas: 3,
      peso: 81.5,
    },
    {
      fecha: 'Miércoles',
      calorias: 500,
      rutinas: 2,
      peso: 81,
    },
    {
      fecha: 'Jueves',
      calorias: 900,
      rutinas: 4,
      peso: 80.7,
    },
    {
      fecha: 'Viernes',
      calorias: 600,
      rutinas: 3,
      peso: 80.3,
    },
  ];

  constructor(
    private userService: UserService,
    private http: HttpClient,
    public accesibilidadService: AccesibilidadService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // VALIDAR SESIÓN
    const usuario = this.userService.obtenerUsuarioActual();

    if (!usuario) {
      this.router.navigate(['/login'], {
        replaceUrl: true,
      });

      return;
    }

    // OBTENER TODOS LOS USUARIOS
    this.usuarios = this.userService.obtenerUsuarios();

    // ESTADÍSTICAS
    this.totalUsuarios = this.usuarios.length;

    this.usuariosActivos = this.usuarios.filter((u) => u.planActivo).length;

    this.usuariosInactivos = this.totalUsuarios - this.usuariosActivos;

    this.totalCalorias = this.usuarios.reduce(
      (acc, usuario) => acc + (usuario.caloriasQuemadas || 0),
      0,
    );
  }

  cambiarVista(vista: string) {
    this.vistaActual = vista;
  }

  enviarCorreoAutomatico(usuario: any) {
    this.http
      .post('http://localhost:3000/enviar-correo', {
        usuario,
        tipo: 'recordatorio',
      })
      .subscribe({
        next: () => {
          console.log('Correo enviado');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  cerrarSesion(): void {
    // BORRAR SESIÓN
    this.userService.cerrarSesion();

    // REDIRECCIÓN SIN PODER REGRESAR
    this.router.navigateByUrl('/login', {
      replaceUrl: true,
    });
  }
}
