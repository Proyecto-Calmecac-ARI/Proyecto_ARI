import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AccesibilidadService {

  // =========================================
  // ESTADO GLOBAL DEL MODO DALTÓNICO
  // =========================================

  private modoDaltonicoSubject =
    new BehaviorSubject<boolean>(false);

  // =========================================
  // OBSERVABLE GLOBAL
  // =========================================

  modoDaltonico$ =
    this.modoDaltonicoSubject.asObservable();

  // =========================================
  // CONSTRUCTOR
  // =========================================

  constructor() {

    // RECUPERAR ESTADO GUARDADO

    const modoGuardado =
      localStorage.getItem('modoDaltonico');

    if (modoGuardado) {

      this.modoDaltonicoSubject.next(
        JSON.parse(modoGuardado)
      );

    }

  }

  // =========================================
  // OBTENER VALOR ACTUAL
  // =========================================

  get modoDaltonicoActivo(): boolean {

    return this.modoDaltonicoSubject.value;

  }

  // =========================================
  // ACTIVAR / DESACTIVAR
  // =========================================

  toggleModoDaltonico(): void {

    const nuevoValor =
      !this.modoDaltonicoSubject.value;

    // ACTUALIZAR ESTADO

    this.modoDaltonicoSubject.next(
      nuevoValor
    );

    // GUARDAR EN LOCAL STORAGE

    localStorage.setItem(
      'modoDaltonico',
      JSON.stringify(nuevoValor)
    );

  }

  // =========================================
  // ACTIVAR MANUALMENTE
  // =========================================

  activarModoDaltonico(): void {

    this.modoDaltonicoSubject.next(true);

    localStorage.setItem(
      'modoDaltonico',
      JSON.stringify(true)
    );

  }

  // =========================================
  // DESACTIVAR MANUALMENTE
  // =========================================

  desactivarModoDaltonico(): void {

    this.modoDaltonicoSubject.next(false);

    localStorage.setItem(
      'modoDaltonico',
      JSON.stringify(false)
    );

  }

}