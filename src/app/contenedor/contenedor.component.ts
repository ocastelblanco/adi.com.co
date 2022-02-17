import { Component, OnInit } from '@angular/core';
import { ClarityIcons } from '@cds/core/icon';
import { Estructura, EstructuraService } from '../servicios/estructura.service';

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
  styleUrls: ['./contenedor.component.scss']
})
export class ContenedorComponent implements OnInit {
  estructura!: Estructura[];
  constructor(private estructuraService: EstructuraService) {
    this.estructuraService.init();
    this.estructuraService.getEstructura().subscribe((estructura: Estructura[]) => this.estructura = estructura);
  }
  ngOnInit(): void {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      const idCont: Element | null = document.getElementById('contenedor');
      idCont ? idCont.setAttribute('cds-theme', 'dark') : null;
    }
  }
}
