import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
export class MembresiaComponent implements OnInit {

  CustomFonts = CustomFonts;
  getFont = getFont;

  selectedPlan: string | null = null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

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

  formData = {
    name: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  };

  ngOnInit(): void {
    const usuario = this.userService.usuarioActual;

    if (!usuario) {
      this.router.navigate(['/Login']);
      return;
    }

    if (usuario.planActivo) {
      this.router.navigate(['/Dashboard']);
    }
  }

  selectPlan(planId: string) {
    this.selectedPlan = planId;
  }

  cancel() {
    this.selectedPlan = null;
    this.formData = {
      name: '',
      cardNumber: '',
      expiration: '',
      cvv: ''
    };
  }

  isNameValid(name: string): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name.trim());
  }

  isCardNumberValid(card: string): boolean {
    return /^\d{16}$/.test(card);
  }

  isExpirationValid(exp: string): boolean {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);
  }

  isCvvValid(cvv: string): boolean {
    return /^\d{3}$/.test(cvv);
  }

  pay() {
    const { name, cardNumber, expiration, cvv } = this.formData;

    if (!name || !cardNumber || !expiration || !cvv) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (!this.isNameValid(name) ||
        !this.isCardNumberValid(cardNumber) ||
        !this.isExpirationValid(expiration) ||
        !this.isCvvValid(cvv)) {
      alert('Datos de pago inválidos');
      return;
    }

    const usuario = this.userService.usuarioActual;
    if (!usuario) return;

    const metodoPago: MetodoPagoInterface = {
      nombreTarjeta: name,
      numeroTarjeta: cardNumber,
      fechaExpiracion: expiration,
      cvv: cvv
    };

    const plan = this.plans.find(p => p.id === this.selectedPlan);

    usuario.metodoPago = metodoPago;
    usuario.planActivo = true;
    usuario.planAsociado = {
      nombrePlan: plan?.name ?? '',
      descripcionPlan: plan?.description ?? '',
      precioPlan: plan?.price ?? 0
    };
    usuario.fechaCompraPlan = new Date();
    usuario.fechaExpiracionPlan = new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    );

    alert('Pago realizado correctamente');
    this.router.navigate(['/Dashboard']);
  }
}
