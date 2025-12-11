import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-membresia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './membresia.component.html',
  styleUrls: ['./membresia.component.scss']
})
export class MembresiaComponent {

  selectedPlan: string | null = null;

  plans = [
    {
      id: 'fitstart',
      name: 'Plan FitStart',
      description:
        'Ideal para usuarios principiantes que quieren iniciar una vida activa. Incluye acceso a rutinas básicas, medición de oxigenación semanal y visualización del ranking general de ejercicios.',
      price: 199
    },
    {
      id: 'powerplus',
      name: 'Plan PowerPlus',
      description:
        'Pensado para personas que ya entrenan de manera regular. Incluye rutinas personalizadas por objetivo, monitoreo avanzado de oxigenación, historial de progreso y ranking por categoría (fuerza, cardio, resistencia).',
      price: 349
    },
    {
      id: 'eliteathlete',
      name: 'Plan EliteAthlete',
      description:
        'La experiencia completa. Acceso a rutinas avanzadas exclusivas, oxigenación en tiempo real, rankings dinámicos, recomendaciones inteligentes según desempeño y sistema de logros gamificado.',
      price: 499
    }
  ];

  formData = {
    name: '',
    cardNumber: '',
    expiration: '',
    cvv: ''
  };

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

  pay() {
    alert('Pago realizado correctamente');
  }
}
