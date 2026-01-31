import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { ListaVideoComponent } from '../lista-video/lista-video';
import { RutinaInterface } from '../../../interfaces/RutinaInterface';
import { UserService } from '../../Services/UserService';

@Component({
  selector: 'app-reproductor-video',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaVideoComponent],
  templateUrl: './reproductor-video.html',
  styleUrl: './reproductor-video.scss',
})
export class ReproductorVideo implements OnInit {

  /* REFERENCIA AL ELEMENTO <video> */
  @ViewChild('video', { static: false })
  videoRef!: ElementRef<HTMLVideoElement>;

  /* fuente de letra */
  customFonts = CustomFonts;
  getFont = getFont;

  /* ESTADO DEL REPRODUCTOR */
  isPlaying = false; // Indica si el video está reproduciéndose
  hasStarted = false; // Indica si el video ya ha comenzado alguna vez
  currentTime = 0; // Tiempo actual del video
  duration = 0; // Duración total del video

  // Variable para controlar visibilidad del menú lateral
  isMenuOpen: boolean = false; // Controla si el menú lateral está abierto
  rutinaSeleccionada!: RutinaInterface;
  videoActualIndex = 0;
  private autoplayAfterChange = false;

  constructor(
    private router: Router,
    private location: Location,
    private userService: UserService
  ) { }

  ngOnInit() {
    // siempre se inicia con la posicion numero 0
    this.videoActualIndex = 0;

    // se obtiene la el objeto de la lista seleccionada
    const navigation = history.state;
    if (navigation?.rutina) {
      this.rutinaSeleccionada = navigation.rutina;
      console.log('Rutina recibida:', this.rutinaSeleccionada);

      setTimeout(() => {
        const video = this.videoRef.nativeElement;
        video.load();
        video.play();
        this.isPlaying = true;
      });
    }
  }

  get videoActual() {
    return this.rutinaSeleccionada?.listaVideos?.[this.videoActualIndex] ?? null;
  }

  /** CAMBIAR VIDEO DESDE LA LISTA */
  cambiarVideo(index: number): void {
    if (index === this.videoActualIndex) return;

    this.videoActualIndex = index;
    this.currentTime = 0;
    this.isPlaying = false;

    // indicamos que debe reproducirse cuando cargue
    this.autoplayAfterChange = true;
  }

  onVideoReady(): void {
    const video = this.videoRef.nativeElement;
    if (this.autoplayAfterChange) {
      this.autoplayAfterChange = false;
      video.play()
        .then(() => {
          this.isPlaying = true;
          this.hasStarted = true;
        })
        .catch(() => {
          this.isPlaying = false;
        });
    }
  }

  /* ABRIR / CERRAR MENÚ LATERAL */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    // Pausar video cuando se abre el menú para mejor experiencia de usuario
    if (this.isMenuOpen && this.isPlaying) {
      this.togglePlay();
    }
  }

  /* PLAY / PAUSE Se ejecuta al hacer click en el video o botones */
  togglePlay() {
    const video = this.videoRef.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
      if (!this.hasStarted) {
        this.hasStarted = true;
      }
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  /* ACTUALIZA EL TIEMPO ACTUAL */
  updateTime() {
    const video = this.videoRef.nativeElement;
    this.currentTime = video.currentTime;
    this.duration = video.duration;
  }

  /* OBTIENE LA DURACIÓN TOTAL DEL VIDEO */
  setDuration() {
    const video = this.videoRef.nativeElement;
    this.duration = isNaN(video.duration) ? 0 : video.duration;
  }

  /* MOVER VIDEO DESDE LA BARRA DE PROGRESO */
  seekVideo() {
    this.videoRef.nativeElement.currentTime = this.currentTime;
  }

  /* PANTALLA COMPLETA */
  toggleFullscreen() {
    const video = this.videoRef.nativeElement;
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  /* TIEMPO RESTANTE (GETTER) */
  get remainingTime(): string {
    if (!this.duration) return '0:00';
    return this.formatTime(this.duration - this.currentTime);
  }

  /* FORMATO DE TIEMPO hh:mm:ss */
  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '00:00:00';
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const sec = Math.floor(seconds % 60);

    const h = hrs.toString().padStart(2, '0');
    const m = min.toString().padStart(2, '0');
    const s = sec.toString().padStart(2, '0');

    return `${h}:${m}:${s}`;
  }

  /* TERMINAR VIDEO */
  endVideo() {
    const video = this.videoRef.nativeElement;
    video.pause();
    video.currentTime = 0;
    this.isPlaying = false;

    //REGISTRAR ASISTENCIA
    this.registrarAsistencia();

    //Reemplaza la url para que no se pueda volver atras despues de cerrar sesion
    this.location.replaceState('/dashboard');

    //Navega al login
    this.router.navigate(['/dashboard']);
  }

  /* VIDEO TERMINADO - REPRODUCIR AUTOMÁTICAMENTE DE NUEVO */
  onVideoEnded(): void {
    const video = this.videoRef.nativeElement;
    video.currentTime = 0;
    video.play();
    this.isPlaying = true;
  }

  private registrarAsistencia(): void {
    const usuario = this.userService.usuarioActual;
    if (!usuario) return;

    const now = new Date();
    const nuevaAsistencia = {
      fechaAsistencia: now,
      dia: now.getDate(),
      mes: now.getMonth(),
      anio: now.getFullYear(),
      tiempoCronometroSegundos: Math.floor(Math.random() * 1001),
    };

    console.log("nuevaAsistencia: ", nuevaAsistencia);

    // Si no existe el arreglo, lo creamos
    if (!usuario.asistencias) {
      usuario.asistencias = [];
    }

    usuario.asistencias.push(nuevaAsistencia);

    // Guardamos cambios
    this.userService.guardarUsuarioActual(usuario);
    this.userService.actualizarUsuario(usuario);
  }
}