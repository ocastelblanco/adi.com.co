import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { EstructuraService, Estructura, Foto } from 'src/app/servicios/estructura.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface FotoFondo extends Foto {
  proyecto: string;
}

@Component({
  selector: 'adi-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.scss'],
  animations: [
    trigger('proyCard', [
      state('true', style({ opacity: 0, transform: 'translateX(100%)' })),
      state('false', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => *', [animate('0.5s ease-in-out')]),
    ]),
    trigger('fade', [
      state('saliendo', style({
        opacity: 0,
      })),
      state('entrando', style({
        opacity: 1,
      })),
      transition('* => *', [
        animate('0.2s ease-in')
      ]),
    ]),
    trigger('derIzq', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0px)'
        }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }))
      ]),
    ]),
    trigger('izqDer', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.5s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0px)'
        }))
      ]),
      transition(':leave', [
        animate('0.5s ease-in-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ]),
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
export class SeccionComponent implements OnInit, AfterViewChecked {
  seccion!: string;
  proyecto!: string;
  numProyecto!: number;
  nombreProyecto!: string;
  estructura!: Estructura;
  schema: any = {};
  imagenes: FotoFondo[] = [];
  listaFondos: number[] = [];
  numFondo: number = 0;
  timestamp: number = 0;
  abreModal: boolean = false;
  numFoto: number = 0;
  _numFoto: number = 0;
  estadoFoto: string = 'saliendo';
  cambiandoFondo: boolean = false;
  constructor(
    private titleService: Title,
    private estructuraService: EstructuraService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.estructuraService.getEstructura().subscribe(e => {
      if (e.length > 0) {
        this.route.params.subscribe(params => {
          this.seccion = params['seccion'] ?? null;
          this.proyecto = params['proyecto'] ?? null;
          if (this.seccion) {
            this.estructura = e.filter(s => this.creaLink(s.seccion) === this.seccion)[0] ?? null;
            if (this.estructura) {
              this.imagenes = [];
              if (this.proyecto) {
                this.numProyecto = this.estructura.proyectos.map(p => this.creaLink(p.proyecto)).indexOf(this.proyecto);
                this.nombreProyecto = this.estructura.proyectos[this.numProyecto].proyecto;
                this.titleService.setTitle('A+DI - ' + this.nombreProyecto);
                this.schema = {
                  '@context': 'http://schema.org',
                  '@type': 'MediaGallery',
                  'name': 'A+DI - ' + this.estructura.seccion + ' / ' + this.nombreProyecto,
                  'url': 'https://adi.com.co/seccion/' + this.seccion + '/' + this.proyecto,
                  'description': this.estructura.proyectos[this.numProyecto].descripcion,
                };
                this.imagenes = this.estructura.proyectos[this.numProyecto].fotos.map(f => {
                  return {
                    ...f,
                    proyecto: this.nombreProyecto
                  };
                });
              } else {
                this.titleService.setTitle('A+DI - ' + this.estructura.seccion);
                this.schema = {
                  '@context': 'http://schema.org',
                  '@type': 'MediaGallery',
                  'name': 'A+DI - ' + this.estructura.seccion,
                  'url': 'https://adi.com.co/seccion/' + this.seccion,
                  'description': this.estructura.descripcion,
                };
                this.estructura.proyectos.forEach(p => {
                  p.fotos.forEach(f => this.imagenes.push({
                    proyecto: p.proyecto,
                    ...f
                  })
                  );
                });
                this.listaFondos = [];
                this.cambiaFondo();
                const timer = interval(1000);
                timer.subscribe(() => this.cambiaFondo());
              }
            } else {
              this.router.navigate(['/inicio']);
            }
          }
        });
      }
    });
  }
  ngAfterViewChecked(): void {
    const cards = document.getElementsByClassName('card proyecto');
    const desc: HTMLElement = document.getElementsByClassName('card proyecto desc')[0] as HTMLElement;
    const ancho: number = desc ? desc.clientWidth : -1;
    for (let i: number = 0; i < cards.length; i++) {
      const card: HTMLElement = cards.item(i) as HTMLElement;
      card.style.height = (ancho / 16 * 13) + 'px';
    }
  }
  cambiaFondo(): void {
    const timestamp: number = Date.now();
    if (timestamp - this.timestamp > 30000 || this.timestamp === 0) {
      this.cambiandoFondo = true;
      window.setTimeout(() => this.cambiandoFondo = false, 500);
      this.timestamp = timestamp;
      this.listaFondos.length < 1 ? this.listaFondos = this.imagenes.map((f, i) => i) : null;
      this.numFondo = this.listaFondos.splice(Math.floor(Math.random() * this.listaFondos.length), 1)[0];
    }
  }
  abrirModal(numFoto: number): void {
    this.numFoto = numFoto;
    this.abreModal = true;
  }
  cambiaFoto(dir: number): void {
    this.estadoFoto = 'saliendo';
    this._numFoto = this.numFoto + dir;
    if (this._numFoto < 0) {
      this._numFoto = this.imagenes.length - 1;
    } else if (this._numFoto > this.imagenes.length - 1) {
      this._numFoto = 0;
    }
  }
  terminaAnimacion(e: any): void {
    this.numFoto = this._numFoto;
  }
  imagenCargada(e: any): void {
    this.estadoFoto = 'entrando';
  }
  creaLink(nombre: string): string {
    return this.estructuraService.creaLink(nombre);
  }
}
