import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Estructura, EstructuraService, Foto, Proyecto } from 'src/app/servicios/estructura.service';

interface Fondo {
  seccion: string;
  proyecto: string;
  descripcion: string;
  foto: string;
}

@Component({
  selector: 'adi-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  estructura!: Estructura[];
  fondos: Fondo[] = [];
  listaFondos: number[] = [];
  numFondo: number = 0;
  timestamp: number = 0;
  schema: any = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    'name': 'A+DI Arquitectura y Diseño Interior',
    'url': 'https://adi.com.co/inicio',
    'description': 'A+DI Arquitectura y Diseño Interior',
  };
  constructor(private estructuraService: EstructuraService) { }
  ngOnInit(): void {
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
    }
  }
  creaLink(nombre: string): string {
    return this.estructuraService.creaLink(nombre);
  }
}
