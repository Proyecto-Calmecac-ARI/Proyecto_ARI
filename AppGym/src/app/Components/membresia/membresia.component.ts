import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { UserService } from '../../Services/UserService';
import { MetodoPagoInterface } from '../../../interfaces/MetodoPagoInterface';

@Component({
  selector: 'app-membresia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent {
// Enumeración y función para manejo de tipografías personalizadas //
  CustomFonts = CustomFonts;
  getFont = getFont;
// Plan seleccionado por el usuario//
  selectedPlan: string | null = null;
// Inyección del servicio de usuarios para acceder y actualizar //
// la información del usuario actual y del arreglo global //
  constructor(private userService: UserService) {}
  // Devuelve siempre el usuario actual desde el servicio
get usuarioActual() {
  return this.userService.usuarioActual;
}
// Catálogo de planes disponibles para la membresía //
  plans = [
    {
      id: 'fitstart',
      name: 'Plan FitStart',
      description: 'Ideal para usuarios principiantes que quieren iniciar una vida activa. Incluye acceso a rutinas básicas, medición de oxigenación semanal y visualización del ranking general de ejercicios.',
      price: 199
    },
    {
      id: 'powerplus',
      name: 'Plan PowerPlus',
      description: 'Pensado para personas que ya entrenan de manera regular. Incluye rutinas personalizadas por objetivo, monitoreo avanzado de oxigenación, historial de progreso y ranking por categoría (fuerza, cardio, resistencia).',
      price: 349
    },
    {
      id: 'eliteathlete',
      name: 'Plan EliteAthlete',
      description: 'La experiencia completa. Acceso a rutinas avanzadas exclusivas, oxigenación en tiempo real, rankings dinámicos, recomendaciones inteligentes según desempeño y sistema de logros gamificado.',
      price: 499
    }
  ];
// almacena los datos ingresados en el formulario de pago //
  formData = {
    name: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  };
// Asigna el plan seleccionado cuando el usuario da clic en contratar //
  selectPlan(planId: string) {
    this.selectedPlan = planId;
  }
// Cancela la selección del plan y reinicia el formulario //
  cancel() {
    this.selectedPlan = null;
    this.formData = { name: '', cardNumber: '', expiration: '', cvv: '' };
  }
  // Validaciones antes de procesar el pago //
  // Valida que el nombre solo contenga letras y espacios
  isNameValid(name: string): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim());
  }
// Valida que el número de tarjeta tenga exactamente 16 dígitos
  isCardNumberValid(card: string): boolean {
    return /^\d{16}$/.test(card);
  }
// Valida el formato de fecha MM/YY
  isExpirationValid(exp: string): boolean {
  // Validar formato MM/YY
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
    return false;
  }

  const [mesStr, anioStr] = exp.split('/');
  const mes = Number(mesStr);
  const anio = Number(anioStr);

  // Año actual en formato YY //
  const fechaActual = new Date();
  const anioActual = fechaActual.getFullYear() % 100;
  const mesActual = fechaActual.getMonth() + 1;

  // Año menor al actual → inválido //
  if (anio < anioActual) {
    return false;
  }

  // Mismo año pero mes menor al actual → inválido //
  if (anio === anioActual && mes < mesActual) {
    return false;
  }

  return true;
}

// Valida que el CVV tenga exactamente 3 dígitos //
  isCvvValid(cvv: string): boolean {
    return /^\d{3}$/.test(cvv);
  }
// Controla la entrada del número de tarjeta permitiendo solo números //
// y limitando la longitud a 16 dígitos //
  onCardInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 16);
    this.formData.cardNumber = input.value;
  }
  // Devuelve el número de tarjeta con formato visual tipo XXXX XXXX XXXX XXXX //
    get cardNumberMasked(): string {
  return this.formData.cardNumber
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
}
// Formatea automáticamente la fecha de expiración en formato MM/YY //
  onExpirationInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) value = value.slice(0, 2) + '/' + value.slice(2);
    input.value = value;
    this.formData.expiration = value;
  }
// Limita el CVV a solo 3 números //
  onCvvInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 3);
    this.formData.cvv = input.value;
  }
// Procesa el pago de la membresía //
// Valida los datos ingresados y actualiza la información //
// del usuario actual y del arreglo global de usuarios //
  pay() {
  const { name, cardNumber, expiration, cvv } = this.formData;
  // Validación de campos obligatorios //
  if (!name || !cardNumber || !expiration || !cvv) {
    alert('Todos los campos son obligatorios');
    return;
  }
// Validación de formatos de los datos ingresados //
  if (
    !this.isNameValid(name) ||
    !this.isCardNumberValid(cardNumber) ||
    !this.isExpirationValid(expiration) ||
    !this.isCvvValid(cvv)
  ) {
    alert('Datos de pago inválidos');
    return;
  }
// Obtención del usuario actualmente logueado //
  const usuarioActual = this.userService.usuarioActual;
  if (!usuarioActual) return;
// Obtención del plan seleccionado por el usuario //
  const planSeleccionado = this.plans.find(p => p.id === this.selectedPlan);
  if (!planSeleccionado) return;
  // Actualizar información del usuario actual //
  usuarioActual.metodoPago = {
  nombreTarjeta: name,
  numeroTarjeta: cardNumber,
  fechaExpiracion: expiration,
  cvv
} as MetodoPagoInterface;
// Activa el plan del usuario y registra fechas de compra y expiración //
  usuarioActual.planActivo = true;
  usuarioActual.fechaCompraPlan = new Date();
  usuarioActual.fechaExpiracionPlan = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
// Asocia el plan seleccionado al usuario actual //
  usuarioActual.planAsociado = {
    nombrePlan: planSeleccionado.name,
    descripcionPlan: planSeleccionado.description,
    precioPlan: planSeleccionado.price
  };
  // Actualizar el usuario dentro del arreglo global de usuarios //
  const usuarios = this.userService.obtenerUsuarios();
// Busca el índice del usuario actual dentro del arreglo global //
  const index = usuarios.findIndex(
    u => u.correo === usuarioActual.correo
  );
// Si el usuario existe en el arreglo, se sobrescribe con la información actualizada //
  if (index !== -1) {
    usuarios[index] = { ...usuarioActual };
  }
  alert('Pago realizado correctamente');
}

}
