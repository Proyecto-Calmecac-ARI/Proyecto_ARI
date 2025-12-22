import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';
@Component({
  selector: 'app-login-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-up.html',
  styleUrl: './login-up.scss',
})
export class LoginUp {
  customFonts = CustomFonts;
  getFont = getFont;
  correo: string = '';
  contrasena: string = '';
  constructor(private userService: UserService, private router: Router) {}
  login() {
    // Validación campos vacíos
    if (!this.correo || !this.contrasena) {
      alert('Debes llenar todos los campos');
      return;
    }
    // Correo inválido
    if (!this.isValidCorreo(this.correo)) {
      alert('Ingresa un correo electrónico válido');
      return;
    }
    const usuario = this.userService.buscarUsuario(this.correo, this.contrasena);
    //  Usuario no existe
    if (!usuario) {
      alert('El usuario no existe, debes registrarte');
      return;
    }
    // Validar vencimiento del plan
    if (usuario.planActivo && usuario.fechaExpiracionPlan) {
      const today = new Date();
      if (today > usuario.fechaExpiracionPlan) {
        alert(
          'Error, detectamos que no has renovado tu membresía, por favor renuévala y vuelve a entrar.'
        );
        return;
      }
    }
    // Guardar usuario global
    this.userService.guardarUsuarioActual(usuario);
    // Redirecciones
    this.router.navigate(['/dashboard']);
  }
  register() {
    // Campos vacíos
    if (!this.correo || !this.contrasena) {
      alert('Debes llenar todos los campos');
      return;
    }
    // Correo inválido
    if (!this.isValidCorreo(this.correo)) {
      alert('Ingresa un correo electrónico válido');
      return;
    }
    // Buscar usuario existente
    const usuario = this.userService.buscarUsuario(this.correo, this.contrasena);
    //  Si ya existe
    if (usuario) {
      alert('El usuario existe, debes iniciar sesión');
      return;
    }
    // Crear nuevo usuario (registro inicial)
    const nuevoUsuario: UserInterface = {
      correo: this.correo,
      contrasena: this.contrasena,
      nombreUsuario: undefined,
      apellidosUsuario: undefined,
      edad: undefined,
      estaturaCm: undefined,
      tipoCuerpo: undefined,
      objetivo: undefined,
      frecuenciaAsistencia: undefined,
      tipoAlimentacion: undefined,
      frecuenciaCardiaca: undefined,
      oxigenacion: undefined,
      trofeos: 0,
      caloriasQuemadas: undefined,
      planActivo: false,
      rutinaActiva: undefined,
      asistencias: undefined,
      planAsociado: undefined,
      metodoPago: undefined,
      fechaCompraPlan: undefined,
      fechaExpiracionPlan: undefined,
    };
    // Guardar en arreglo global
    this.userService.agregarUsuario(nuevoUsuario);
    // Guardar como usuario actual
    this.userService.guardarUsuarioActual(nuevoUsuario);
    // Ir al formulario para completar perfil
    this.router.navigate(['/formulario']);
  }
  scrollAPlanes() {
    const element = document.getElementById('planes');
    element?.scrollIntoView({ behavior: 'smooth' });
  }
  isValidCorreo(correo: string): boolean {
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return correoRegex.test(correo);
  }
}