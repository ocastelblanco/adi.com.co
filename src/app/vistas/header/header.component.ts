import { Component, Input, OnInit } from '@angular/core';
import { EstructuraService, Estructura } from 'src/app/servicios/estructura.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'adi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('linkMenu', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0px)'
        }))
      ])
    ]),
  ]
})
export class HeaderComponent implements OnInit {
  @Input() titulo!: string;
  @Input() seccion!: string | null;
  @Input() proyecto!: string | null;
  estructura: Estructura[] = [];
  constructor(private estructuraService: EstructuraService) { }
  ngOnInit(): void {
    this.estructuraService.getEstructura().subscribe(e => this.estructura = e);
  }
  creaLink(nombre: string): string {
    return this.estructuraService.creaLink(nombre);
  }
}
