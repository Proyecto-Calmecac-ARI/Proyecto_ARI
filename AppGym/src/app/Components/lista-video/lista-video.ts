import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';

@Component({
  selector: 'app-lista-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-video.html',
  styleUrls: ['./lista-video.scss'],
})
export class ListaVideoComponent {
 /* INPUT */
  @Input() videos: any[] = [];

  /* OUTPUTS */
  @Output() closeMenu = new EventEmitter<void>();
  @Output() videoSeleccionado = new EventEmitter<number>();

  /* FUENTES */
  CustomFonts = CustomFonts;
  getFont = getFont;

  cerrarMenu(): void {
    this.closeMenu.emit();
  }

   seleccionarVideo(id: number): void {
  
    this.videoSeleccionado.emit(id - 1);
  }
}
