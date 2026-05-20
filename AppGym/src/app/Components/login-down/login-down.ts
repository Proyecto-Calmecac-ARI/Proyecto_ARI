import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { AccesibilidadService } from '../../Services/accesibilidad.service';
@Component({
  selector: 'app-login-down',
  imports: [ CommonModule ],
  templateUrl: './login-down.html',
  styleUrl: './login-down.scss',
})
export class LoginDown {
  customFonts = CustomFonts
  getFont = getFont
  constructor( public accesibilidadService: AccesibilidadService) {}
}
