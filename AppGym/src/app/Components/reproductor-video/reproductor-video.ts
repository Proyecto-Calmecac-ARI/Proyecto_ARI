import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { ListaVideoComponent } from '../lista-video/lista-video';

@Component({
  selector: 'app-reproductor-video',
  standalone: true,
  imports: [CommonModule, FormsModule, ListaVideoComponent],
  templateUrl: './reproductor-video.html',
  styleUrl: './reproductor-video.scss',
})
export class ReproductorVideo implements OnInit {

  categoria = '';
  listaVideos: any[] = [];
  currentVideoIndex = 0;

  /* ESTADO DEL REPRODUCTOR */
  isPlaying = false;
  currentTime = 0;
  duration = 0;
  isMenuOpen = false;

  /* FUENTES */
  customFonts = CustomFonts;
  getFont = getFont;

  /* VIDEO */
  @ViewChild('video', { static: true })
  videoRef!: ElementRef<HTMLVideoElement>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoria = params['categoria'] ?? '';
      this.cargarVideos();
    });
  }

  /* VIDEOS POR CATEGORÍA (UNIFICADO) */
    cargarVideos(): void {
    const data: Record<string, any[]> = {
      'quema-grasa': [
      { title: 'Quema grasa 1', src: '/assets/videos/RutinaGym1.mp4' },
      { title: 'Quema grasa 2', src: '/assets/videos/RutinaGym2.mp4' },
      { title: 'Quema grasa 3', src: '/assets/videos/RutinaGym3.mp4' },
      { title: 'Quema grasa 4', src: '/assets/videos/RutinaGym4.mp4' },
      { title: 'Quema grasa 5', src: '/assets/videos/RutinaGym5.mp4' }
    ],
    'full-body': [
      { title: 'Full Body 1', src: '/assets/videos/RutinaGym6.mp4' },
      { title: 'Full Body 2', src: '/assets/videos/RutinaGym7.mp4' },
      { title: 'Full Body 3', src: '/assets/videos/RutinaGym8.mp4' },
      { title: 'Full Body 4', src: '/assets/videos/RutinaGym9.mp4' },
      { title: 'Full Body 5', src: '/assets/videos/RutinaGym10.mp4' }
    ],
    'fuerza-resistencia': [
      { title: 'Fuerza 1', src: '/assets/videos/RutinaGym11.mp4' },
      { title: 'Fuerza 2', src: '/assets/videos/RutinaGym12.mp4' },
      { title: 'Fuerza 3', src: '/assets/videos/RutinaGym13.mp4' },
      { title: 'Fuerza 4', src: '/assets/videos/RutinaGym14.mp4' },
      { title: 'Fuerza 5', src: '/assets/videos/RutinaGym15.mp4' }
    ],
    'cardio-power': [
      { title: 'Cardio Power 1', src: '/assets/videos/RutinaGym16.mp4' },
      { title: 'Cardio Power 2', src: '/assets/videos/RutinaGym17.mp4' },
      { title: 'Cardio Power 3', src: '/assets/videos/RutinaGym18.mp4' },
      { title: 'Cardio Power 4', src: '/assets/videos/RutinaGym19.mp4' },
      { title: 'Cardio Power 5', src: '/assets/videos/RutinaGym20.mp4' }
    ]
  };

  const videos = data [this.categoria] ?? [];

  this.listaVideos = videos.map((v, i) => ({
    id: i + 1,          //  OBLIGATORIO
    title: v.title,
    src: v.src,
    active: i === 0    // Primer video activo
  }));

  this.currentVideoIndex = 0;
}

  /* MENÚ */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /* CAMBIAR VIDEO (VIENE DE ListaVideoComponent) */
  cambiarVideo(index: number): void {
     const selected = this.listaVideos[index];
  if (!selected) return;

  this.currentVideoIndex = index;
  this.listaVideos.forEach((v, i) => v.active = i === index);

  const video = this.videoRef.nativeElement;

  video.pause();
  video.removeAttribute('src');
  video.load();

  video.src = this.listaVideos[index].src;
  video.load();

  video.oncanplay = () => {
    video.play();
    this.isPlaying = true;
  };

  this.isMenuOpen = false;

  if (this.listaVideos.length > 0) {
  setTimeout(() => this.cambiarVideo(0));
}
}

  /* ===== PLAY / PAUSE ===== */
  togglePlay(): void {
    const video = this.videoRef.nativeElement;
    video.paused ? video.play() : video.pause();
    this.isPlaying = !video.paused;
  }

  /* TIEMPO */
  updateTime(): void {
    this.currentTime = this.videoRef.nativeElement.currentTime;
  }

  setDuration(): void {
    const video = this.videoRef.nativeElement;
    this.duration = isNaN(video.duration) ? 0 : video.duration;
  }

  seekVideo(): void {
    this.videoRef.nativeElement.currentTime = this.currentTime;
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }

  onVideoEnded(): void {
    if (this.currentVideoIndex < this.listaVideos.length - 1) {
      this.cambiarVideo(this.currentVideoIndex + 1);
    } else {
      this.isPlaying = false;
    }
  }

  endVideo(): void {
    this.onVideoEnded();
  }
}
