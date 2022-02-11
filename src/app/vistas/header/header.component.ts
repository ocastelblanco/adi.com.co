import { Component, Input, OnInit } from '@angular/core';
import { EstructuraService, Estructura } from 'src/app/servicios/estructura.service';

@Component({
  selector: 'adi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() titulo!: string;
  estructura: Estructura[] = [];
  constructor(private estructuraService: EstructuraService) { }
  ngOnInit(): void {
    this.estructuraService.getEstructura().subscribe(e => this.estructura = e);
  }
  creaLink(nombre: string): string {
    return this.estructuraService.creaLink(nombre);
  }
}
