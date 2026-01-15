import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { UserService } from '../../Services/UserService';
import { UserInterface } from '../../../interfaces/UserInterface';

@Component({
  selector: 'app-header-dasboard',
  imports: [CommonModule],
  templateUrl: './header-dasboard.html',
  styleUrl: './header-dasboard.scss',
})
export class HeaderDasboard {
  CustomFonts = CustomFonts
  getFont = getFont
  userActual: UserInterface | null = null;
  constructor(private userService: UserService){}
  ngOnInit(): void{
    this.userActual = this.userService.usuarioActual;
  }
}
