import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from
'@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { RutinaInterface } from '../../../interfaces/RutinaInterface';

@Component({
  selector: 'app-lista-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-video.html',
  styleUrls: ['./lista-video.scss'],
})
export class ListaVideoComponent implements OnChanges {

  // Evento para cerrar el menú desde este componente
  @Output() closeMenu = new EventEmitter<void>();

  CustomFonts = CustomFonts;
  getFont = getFont;

  // obtenemos el tipo desde RutinaInterface
  @Input() videos: RutinaInterface['listaVideos'] = [];
  @Input() videoActivo = 0;

  @Output() seleccionarVideo = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['videos']) {
      console.log(
        ' videos recibidos en ListaVideoComponent:',
        this.videos
      );
    }

  }

  seleccionar(index: number): void {

    this.seleccionarVideo.emit(index);
    this.cerrarMenu();

  }

  // Método para cerrar el menú
  cerrarMenu(): void {

    this.closeMenu.emit();

  }

}
