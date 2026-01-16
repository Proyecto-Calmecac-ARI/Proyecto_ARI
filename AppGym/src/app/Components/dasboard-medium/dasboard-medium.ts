import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';
import { AsistenciasInterface } from '../../../interfaces/AsistenciasInterface';

/* MODELO PARA MOSTRAR EL RANKING */
interface RankingUser {
  position: number;
  name: string;
  trophies: number;
}

/* MODELO PARA CELDAS DEL CALENDARIO */
interface CalendarCell {
  day?: number;
  date?: Date;
}

@Component({
  selector: 'app-dasboard-medium',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dasboard-medium.html',
  styleUrl: './dasboard-medium.scss',
})
export class DasboardMedium implements OnInit {

  /* FUENTES PERSONALIZADAS (YA EXISTENTES) */
  customFonts = CustomFonts;
  getFont = getFont;

  /* RANKING DE USUARIOS (SE MUESTRA EN EL HTML) */
  rankingUsers: RankingUser[] = [];

  /* USUARIO ACTUAL (DESDE USER SERVICE) */
  usuarioActual: UserInterface | null = null;

  /* DATOS BASE DEL CALENDARIO (SIN CAMBIOS) */
  weekDays = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  currentYear!: number;
  currentMonth!: number;
  selectedDate: Date | null = null;

  calendarCells: Array<CalendarCell | null> = [];

  yearOptions: number[] = [];
  monthOptions = this.monthNames;

  /* INYECCIÓN DEL USER SERVICE */
  constructor(private userService: UserService) { }

  /* INIT DEL COMPONENTE */
  ngOnInit(): void {
    const today = new Date();

    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();

    /* LISTA DE AÑOS */
    for (let y = this.currentYear - 5; y <= this.currentYear + 5; y++) {
      this.yearOptions.push(y);
    }

    /* OBTENER USUARIO ACTUAL (LOGIN / REGISTRO) */
    this.usuarioActual = this.userService.usuarioActual;

    /* GENERAR RANKING DESDE EL SERVICE */
    this.generarRanking();

    this.generateCalendar();
  }

  /* LOGICA DE NEGOCIO - RANKING (CUMPLE EXACTO EL JIRA) */
  generarRanking(): void {

    /* OBTENER TODOS LOS USUARIOS */
    const usuarios: UserInterface[] = this.userService.obtenerUsuarios();

    /* ORDENAR POR TROFEOS DE MAYOR A MENOR */
    const usuariosOrdenados = [...usuarios].sort(
      (a, b) => (b.trofeos ?? 0) - (a.trofeos ?? 0)
    );

    /* TOMAR MAXIMO 5 USUARIOS */
    const topUsuarios = usuariosOrdenados.slice(0, 5);

    /* MAPEAR A LO QUE USA EL HTML */
    this.rankingUsers = topUsuarios.map((usuario, index) => ({
      position: index + 1,
      name: `${usuario.nombreUsuario} ${usuario.apellidosUsuario}`,
      trophies: usuario.trofeos ?? 0
    }));
  }

  /* LOGICA DEL CALENDARIO (ORIGINAL) */
  generateCalendar(): void {
    this.calendarCells = [];

    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const startWeekDay = firstDay.getDay();

    const daysInMonth = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();

    for (let i = 0; i < startWeekDay; i++) {
      this.calendarCells.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.currentYear, this.currentMonth, d);
      this.calendarCells.push({ day: d, date });
    }

    while (this.calendarCells.length % 7 !== 0) {
      this.calendarCells.push(null);
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  selectDay(cell: CalendarCell | null): void {
    if (!cell || !cell.date) return;
    this.selectedDate = cell.date;
  }

  isSelected(cell: CalendarCell | null): boolean {
    if (!cell || !cell.date || !this.selectedDate) return false;
    return cell.date.toDateString() === this.selectedDate.toDateString();
  }

  isToday(cell: CalendarCell | null): boolean {
    if (!cell || !cell.date) return false;
    const today = new Date();
    return cell.date.toDateString() === today.toDateString();
  }

  /* LOGICA DE ACTIVIDAD FISICA (USUARIO ACTUAL) */
  hasAttendance(cell: CalendarCell | null): boolean {
    if (
      !cell ||
      !cell.day ||
      !this.usuarioActual ||
      !this.usuarioActual.asistencias
    ) {
      return false;
    }

    return this.usuarioActual.asistencias.some(
      (asistencia: AsistenciasInterface) =>
        (asistencia.tiempoCronometroSegundos ?? 0) > 0 &&
        asistencia.dia === cell.day &&
        asistencia.mes === this.currentMonth &&
        asistencia.anio === this.currentYear
    );
  }
}