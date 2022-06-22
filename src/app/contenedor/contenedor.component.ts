import { Component, OnInit } from '@angular/core';
import { ClarityIcons } from '@cds/core/icon';
import { Estructura, EstructuraService, Ruta } from '../servicios/estructura.service';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

const isotipo_color: string = `
<svg version="1.1" width="36" height="36" preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 289.92 383.32">
  <defs>
    <style>
      .rojo {
        fill: #d9251d;
      }
      .negro {
        fill: #000000;
      }
    </style>
  </defs>
  <g id="logo_adi" data-name="logo_adi">
    <rect id="rojo" class="rojo" x="96.35" y="165.05" width="56.74" height="53.65"/>
    <polygon id="negro" class="negro" data-name="negro" points="165.63 92.37 220.63 92.37 220.63 165.05 289.92 165.05 289.92 218.69 220.63 218.69 220.63 290.66 165.63 290.66 165.65 218.69 153.09 218.69 153.09 165.05 165.65 164.79 165.63 92.37"/>
    <path id="a" class="negro" d="M88.71,91.29a19.12,19.12,0,1,1,7-14.75v76.55h57.43V76.54a76.55,76.55,0,1,0-76.55,76.55,77.37,77.37,0,0,0,12.17-1V91.29"/>
    <path id="d" class="negro" d="M88.71,292V231.19a77.37,77.37,0,0,0-12.17-1,76.55,76.55,0,1,0,76.55,76.55V230.23H95.66v76.55a19.11,19.11,0,1,1-7-14.75"/>
  </g>
</svg>
`;
const isotipo_blanco: string = `
<svg version="1.1" width="36" height="36" preserveAspectRatio="xMidYMid meet"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 289.92 383.32">
  <defs>
    <style>
      .rojo {
        fill: #ffffff;
      }
      .negro {
        fill: #ffffff;
      }
    </style>
  </defs>
  <g id="logo_adi" data-name="logo_adi">
    <rect id="rojo" class="rojo" x="96.35" y="165.05" width="56.74" height="53.65"/>
    <polygon id="negro" class="negro" data-name="negro" points="165.63 92.37 220.63 92.37 220.63 165.05 289.92 165.05 289.92 218.69 220.63 218.69 220.63 290.66 165.63 290.66 165.65 218.69 153.09 218.69 153.09 165.05 165.65 164.79 165.63 92.37"/>
    <path id="a" class="negro" d="M88.71,91.29a19.12,19.12,0,1,1,7-14.75v76.55h57.43V76.54a76.55,76.55,0,1,0-76.55,76.55,77.37,77.37,0,0,0,12.17-1V91.29"/>
    <path id="d" class="negro" d="M88.71,292V231.19a77.37,77.37,0,0,0-12.17-1,76.55,76.55,0,1,0,76.55,76.55V230.23H95.66v76.55a19.11,19.11,0,1,1-7-14.75"/>
  </g>
</svg>
`;
ClarityIcons.addIcons(['logo_color', isotipo_color], ['logo_blanco', isotipo_blanco]);

@Component({
  selector: 'adi-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss'],
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
export class ContenedorComponent implements OnInit {
  ruta: Ruta = { seccion: null, proyecto: null };
  esSeccion: boolean = false;
  estructura!: Estructura;
  estructuraTotal!: Estructura[];
  numProyecto!: number;
  nombreProyecto!: string;
  schema: any = {};
  titulo: string = 'A+DI Arquitectura y Diseño Interior';
  descripcionGeneral!: string;
  constructor(
    private titleService: Title,
    private estructuraService: EstructuraService,
    private router: Router,
    private metaService: Meta
  ) {
    this.estructuraService.init();
  }
  ngOnInit(): void {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const idCont: Element | null = document.getElementById('contenedor');
      idCont ? idCont.setAttribute('cds-theme', 'dark') : null;
    }
    this.estructuraService.getEstructura().subscribe((estructuraJSON: Estructura[]) => {
      this.estructuraTotal = estructuraJSON;
      if (this.estructuraTotal.length > 0) {
        this.descripcionGeneral = this.estructuraTotal[0].descripcion.replace(/\n/gm, ' ');
        this.titleService.setTitle(this.titulo);
        this.metaService.addTags([
          { name: 'keywords', content: 'adi, arquitectura, diseño, diseno, diseño interior, diseno interior, architecture, interior design, design, mobiliario, furniture, remodelaciones' },
          { name: 'description', content: this.descripcionGeneral },
          { name: 'robots', content: 'index, follow' }
        ]);
        this.estructuraService.getRuta().subscribe((ruta: Ruta) => {
          window.setTimeout(() => {
            this.ruta = ruta;
            if (this.ruta.seccion) {
              this.estructura = this.estructuraTotal.filter(s => this.creaLink(s.seccion) === this.ruta.seccion)[0] ?? null;
              if (this.estructura) {
                if (this.ruta.proyecto) {
                  this.numProyecto = this.estructura.proyectos.map(p => this.creaLink(p.proyecto)).indexOf(this.ruta.proyecto);
                  this.nombreProyecto = this.estructura.proyectos[this.numProyecto].proyecto;
                  this.titleService.setTitle('A+DI - ' + this.nombreProyecto);
                  this.schema = {
                    '@context': 'http://schema.org',
                    '@type': 'MediaGallery',
                    'name': 'A+DI - ' + this.nombreProyecto,
                    'url': 'https://adi.com.co/seccion/' + this.ruta.seccion + '/' + this.ruta.proyecto,
                    'description': this.estructura.proyectos[this.numProyecto].descripcion,
                  };
                } else {
                  this.titleService.setTitle('A+DI - ' + this.estructura.seccion);
                  this.schema = {
                    '@context': 'http://schema.org',
                    '@type': 'MediaGallery',
                    'name': 'A+DI - ' + this.estructura.seccion,
                    'url': 'https://adi.com.co/seccion/' + this.ruta.seccion,
                    'description': this.estructura.descripcion,
                  };
                }
              } else {
                this.router.navigate(['/inicio']);
              }
            } else {
              this.titleService.setTitle(this.titulo);
              this.schema = {
                '@context': 'http://schema.org',
                '@type': 'WebSite',
                'name': this.titulo,
                'url': 'https://adi.com.co/inicio',
                'description': this.descripcionGeneral
              };
            }
            if (this.ruta.proyecto === 'contactenos') {
              this.schema = {
                '@context': 'http://schema.org',
                '@type': 'ContactPage',
                'name': 'A+DI - Contáctenos',
                'url': 'https://adi.com.co/contactenos',
                'description': '¿Qué podemos hacer por usted?',
              };
            }
            this.estructuraService.creaURLCanonica();
          }, 500);
        });
      }
    });
  }
  creaLink(nombre: string): string {
    return this.estructuraService.creaLink(nombre);
  }
}
