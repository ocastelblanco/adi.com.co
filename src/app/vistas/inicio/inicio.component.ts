import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
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
  titulo: string = 'A+DI Arquitectura y Diseño Interior';
  descripcionGeneral!: string;
  estructura!: Estructura[];
  fondos: Fondo[] = [];
  listaFondos: number[] = [];
  numFondo: number = 0;
  timestamp: number = 0;
  schema: any = {};
  constructor(
    private estructuraService: EstructuraService,
    private titleService: Title,
    private metaService: Meta,
  ) { }
  ngOnInit(): void {
    this.estructuraService.getEstructura().subscribe((data: Estructura[]) => {
      this.estructura = data;
      if (this.estructura.length > 0) {
        this.descripcionGeneral = this.estructura[0].descripcion.replace(/\n/gm, ' ');
        this.titleService.setTitle(this.titulo);
        this.metaService.addTags([
          { name: 'keywords', content: 'adi, arquitectura, diseño, diseno, diseño interior, diseno interior, architecture, interior design, design, mobiliario, furniture, remodelaciones' },
          { name: 'description', content: this.descripcionGeneral },
          { name: 'robots', content: 'index, follow' }
        ]);
        this.schema = {
          '@context': 'http://schema.org',
          '@type': 'WebSite',
          'name': this.titulo,
          'url': 'https://adi.com.co/inicio',
          'description': this.descripcionGeneral
        };
      }
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
