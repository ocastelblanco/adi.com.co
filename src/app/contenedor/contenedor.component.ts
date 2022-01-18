import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ClarityIcons, rulerPencilIcon } from '@cds/core/icon';

ClarityIcons.addIcons(rulerPencilIcon);

@Component({
  selector: 'adi-contenedor',
  templateUrl: './contenedor.component.html',
  styleUrls: ['./contenedor.component.scss']
})
export class ContenedorComponent {
  titulo: string = 'A+DI Arquitectura y Diseño Interior';
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {
    this.titleService.setTitle(this.titulo);
    this.metaService.addTags([
      { name: 'keywords', content: 'adi, arquitectura, diseño, diseno, diseño interior, diseno interior, architecture, interior design, design, mobiliario, furniture, remodelaciones' },
      { name: 'description', content: 'Somos una empresa de Arquitectura y Diseño interior con más de 10 años de experiencia en diseño y construcción de mobiliario y obra civil.' },
      { name: 'robots', content: 'index, follow' }
    ]);
    //document.getElementsByTagName('body')[0].setAttribute('cds-theme', 'dark');
  }
}
