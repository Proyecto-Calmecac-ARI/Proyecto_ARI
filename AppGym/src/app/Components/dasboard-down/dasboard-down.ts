import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFonts } from '../../enums/fonts.enum';
import { getFont } from '../../utils/font.util';
import { RutinaInterface } from '../../../interfaces/RutinaInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dasboard-down',
  imports: [CommonModule],
  templateUrl: './dasboard-down.html',
  styleUrl: './dasboard-down.scss',
})
export class DasboardDown {

  CustomFonts = CustomFonts;
  getFont = getFont;

  videos: RutinaInterface[] = [

    {
      nombreLista: "Quema grasa",
      listaVideos: [

        {
          nombreVideo: "Video 1",
          urlVideo: "assets/images/reproductor/RutinaGym1.mp4",
          videoVisto: false,
          nombreCoach: "Coach 1"
        },
        {
          nombreVideo: "Video 2",
          urlVideo: "assets/images/reproductor/RutinaGym2.mp4",
          videoVisto: false,
          nombreCoach: "Coach 2"
        },
        {
          nombreVideo: "Video 3",
          urlVideo: "assets/images/reproductor/RutinaGym3.mp4",
          videoVisto: false,
          nombreCoach: "Coach 5"
        },
        {
          nombreVideo: "Video 4",
          urlVideo: "assets/images/reproductor/RutinaGym4.mp4",
          videoVisto: false,
          nombreCoach: "Coach 2"
        },
        {
          nombreVideo: "Video 5",
          urlVideo: "assets/images/reproductor/RutinaGym5.mp4",
          videoVisto: false,
          nombreCoach: "Coach 3"
        },

      ],
      imagenRutina: "/assets/images/dashboard/Grupo 40.png"
    },

    {
      nombreLista: "Full Body",
      listaVideos: [

        {
          nombreVideo: "Video 1",
          urlVideo: "assets/images/reproductor/RutinaGym6.mp4",
          videoVisto: false,
          nombreCoach: "Coach 4"
        },
        {
          nombreVideo: "Video 2",
          urlVideo: "assets/images/reproductor/RutinaGym7.mp4",
          videoVisto: false,
          nombreCoach: "Coach 3"
        },
        {
          nombreVideo: "Video 3",
          urlVideo: "assets/images/reproductor/RutinaGym8.mp4",
          videoVisto: false,
          nombreCoach: "Coach 3"
        },
        {
          nombreVideo: "Video 4",
          urlVideo: "assets/images/reproductor/RutinaGym9.mp4",
          videoVisto: false,
          nombreCoach: "Coach 1"
        },
        {
          nombreVideo: "Video 5",
          urlVideo: "assets/images/reproductor/RutinaGym10.mp4",
          videoVisto: false,
          nombreCoach: "Coach 7"
        },
      ],
      imagenRutina: "/assets/images/dashboard/Grupo 41.png"
    },

    {
      nombreLista: "Fuerza y Resistencia",
      listaVideos: [

        {
          nombreVideo: "Video 1",
          urlVideo: "assets/images/reproductor/RutinaGym11.mp4",
          videoVisto: false,
          nombreCoach: "Coach 1"
        },
        {
          nombreVideo: "Video 2",
          urlVideo: "assets/images/reproductor/RutinaGym12.mp4",
          videoVisto: false,
          nombreCoach: "Coach 5"
        },
        {
          nombreVideo: "Video 3",
          urlVideo: "assets/images/reproductor/RutinaGym13.mp4",
          videoVisto: false,
          nombreCoach: "Coach 5"
        },
        {
          nombreVideo: "Video 4",
          urlVideo: "assets/images/reproductor/RutinaGym14.mp4",
          videoVisto: false,
          nombreCoach: "Coach 3"
        },
        {
          nombreVideo: "Video 5",
          urlVideo: "assets/images/reproductor/RutinaGym15.mp4",
          videoVisto: false,
          nombreCoach: "Coach 5"
        },

      ],
      imagenRutina: "/assets/images/dashboard/Grupo 42.png"
    },

    {
      nombreLista: "Cardio Power 30",
      listaVideos: [

        {
          nombreVideo: "Video 1",
          urlVideo: "assets/images/reproductor/RutinaGym16.mp4",
          videoVisto: false,
          nombreCoach: "Coach 10"
        },
        {
          nombreVideo: "Video 2",
          urlVideo: "assets/images/reproductor/RutinaGym17.mp4",
          videoVisto: false,
          nombreCoach: "Coach 6"
        },
        {
          nombreVideo: "Video 3",
          urlVideo: "assets/images/reproductor/RutinaGym18.mp4",
          videoVisto: false,
          nombreCoach: "Coach 6"
        },
        {
          nombreVideo: "Video 4",
          urlVideo: "assets/images/reproductor/RutinaGym19.mp4",
          videoVisto: false,
          nombreCoach: "Coach 6"
        },
        {
          nombreVideo: "Video 5",
          urlVideo: "assets/images/reproductor/RutinaGym20.mp4",
          videoVisto: false,
          nombreCoach: "Coach 6"
        },

      ],
      imagenRutina: "/assets/images/dashboard/Grupo 43.png"
    }

  ];

  constructor(private router: Router) {}

  clicRutine(routine: RutinaInterface) {

    console.log("Nombre seleccionado: ", routine.nombreLista);
    console.log("Lista seleccionada: ", routine.listaVideos);

    this.router.navigate(
      ['/reproductor'],
      {
        state: {
          rutina: routine
        }
      }
    );
  }
}
