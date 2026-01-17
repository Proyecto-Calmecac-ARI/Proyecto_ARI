import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/* FUENTES */
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-dasboard-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dasboard-down.html',
  styleUrl: './dasboard-down.scss',
})
export class DasboardDown {

  /* ===== FUENTES DISPONIBLES EN HTML ===== */
  CustomFonts = CustomFonts;
  getFont = getFont;

  constructor(private router: Router) {}

  /* ===== PROPIEDAD NECESARIA PARA EL HTML ===== */
  video = {
    title: ''
  };

  /* ===== CATEGORÍAS MOSTRADAS EN EL DASHBOARD ===== */
  categorias = [
    { id: 'quema-grasa', title: 'Quema grasa', img: '/assets/images/dashboard/Grupo 40.png' },
    { id: 'full-body', title: 'Full Body', img: '/assets/images/dashboard/Grupo 41.png' },
    { id: 'fuerza-resistencia', title: 'Fuerza y Resistencia', img: '/assets/images/dashboard/Grupo 42.png' },
    { id: 'cardio-power', title: 'Cardio Power 30', img: '/assets/images/dashboard/Grupo 43.png' },
  ];

  /* ===== AL DAR CLIC EN UNA IMAGEN ===== */
  seleccionarCategoria(cat: any): void {
    this.video.title = cat.title; // mantiene coherencia visual
    this.router.navigate(['/reproductor'], {
      queryParams: { categoria: cat.id }
    });
  }
}

