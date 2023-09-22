import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Estructura, EstructuraService, Foto, Proyecto } from 'src/app/servicios/estructura.service';
import { trigger, state, transition, style, animate } from '@angular/animations';

interface Fondo {
  seccion: string;
  proyecto: string;
  descripcion: string;
  foto: string;
}

@Component({
  selector: 'adi-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [
    trigger('proyCard', [
      state('true', style({ opacity: 0, transform: 'translateX(100%)' })),
      state('false', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => *', [animate('0.5s ease-in-out')]),
    ]),
    trigger('arrAba', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.5s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0px)'
        }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }))
      ]),
    ]),
  ]
})
export class InicioComponent implements OnInit {
  estructura!: Estructura[];
  fondos: Fondo[] = [];
  listaFondos: number[] = [];
  numFondo: number = 0;
  timestamp: number = 0;
  cambiaFondo: boolean = false;
  constructor(private estructuraService: EstructuraService) { }
  ngOnInit(): void {
    this.estructuraService.emiteRuta({ proyecto: null, seccion: null });
    this.estructuraService.getEstructura().subscribe((data: Estructura[]) => {
      this.estructura = data;
      this.estructura.filter((s, i) => i > 0).forEach((sec: Estructura) => {
        sec.proyectos.forEach((pro: Proyecto) => {
          pro.fotos.forEach((foto: Foto) => {
            this.fondos.push({
              seccion: sec.seccion,
              proyecto: pro.proyecto,
              descripcion: foto.descripcion,
              foto: foto.foto
            });
          });
        });
      });
      if (this.fondos.length > 0) this.cargaFondo();
      const timer = interval(1000);
      timer.subscribe(() => this.cargaFondo());
    });
  }
  cargaFondo() {
    const timestamp: number = Date.now();
    if ((timestamp - this.timestamp > 30000 || this.timestamp === 0) && this.fondos.length > 0) {
      this.timestamp = timestamp;
      if (this.listaFondos.length < 1) this.listaFondos = this.fondos.map((f, i) => i);
      this.numFondo = this.listaFondos.splice(Math.floor(Math.random() * this.listaFondos.length), 1)[0];
      this.cambiaFondo = true;
      window.setTimeout(() => this.cambiaFondo = false, 500);
    }
  }
  creaLink(nombre: string): string {
    return this.estructuraService.creaLink(nombre);
  }
}
