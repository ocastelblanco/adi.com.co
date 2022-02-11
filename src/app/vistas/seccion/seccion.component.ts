import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { EstructuraService, Estructura, Foto } from 'src/app/servicios/estructura.service';

interface FotoFondo extends Foto {
  proyecto: string;
}

@Component({
  selector: 'adi-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.scss']
})
export class SeccionComponent implements OnInit {
  seccion: string | null = null;
  proyecto: string | null = null;
  estructura!: Estructura;
  schema: any = {};
  imagenes: FotoFondo[] = [];
  listaFondos: number[] = [];
  numFondo: number = 0;
  timestamp: number = 0;
  constructor(
    private titleService: Title,
    private estructuraService: EstructuraService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.estructuraService.getEstructura().subscribe(e => {
      this.route.params.subscribe(params => {
        this.seccion = params['seccion'] ?? null;
        this.proyecto = params['proyecto'] ?? null;
        if (this.seccion) {
          this.estructura = e.filter(s => this.estructuraService.creaLink(s.seccion) === this.seccion)[0] ?? null;
          if (this.estructura) {
            this.titleService.setTitle(this.estructura.seccion);
            this.schema = {
              '@context': 'http://schema.org',
              '@type': 'MediaGallery',
              'name': 'A+DI - ' + this.estructura.seccion,
              'url': 'https://adi.com.co/seccion/' + this.seccion,
              'description': this.estructura.descripcion,
            };
            this.imagenes = [];
            this.estructura.proyectos.forEach(p => {
              p.fotos.forEach(f => this.imagenes.push({
                proyecto: p.proyecto,
                foto: f.foto,
                descripcion: f.descripcion
              })
              );
            });
            this.listaFondos = [];
            this.cambiaFondo();
            const timer = interval(1000);
            timer.subscribe(() => this.cambiaFondo());
          } else {
            this.router.navigate(['/inicio']);
          }
        }
      });
    });
  }
  cambiaFondo() {
    const timestamp: number = Date.now();
    if (timestamp - this.timestamp > 30000 || this.timestamp === 0) {
      this.timestamp = timestamp;
      this.listaFondos.length < 1 ? this.listaFondos = this.imagenes.map((f, i) => i) : null;
      this.numFondo = this.listaFondos.splice(Math.floor(Math.random() * this.listaFondos.length), 1)[0];
    }
  }
  creaLink(nombre: string): string {
    return this.estructuraService.creaLink(nombre);
  }
}
