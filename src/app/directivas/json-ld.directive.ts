import { DOCUMENT } from '@angular/common';
import {
  Directive,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  ElementRef,
  Renderer2,
  Inject
} from '@angular/core';

@Directive({
  selector: '[adi-json-jd]'
})
export class JsonLdDirective implements OnInit, OnChanges {
  @Input() json: any;
  script!: HTMLElement;
  constructor(
    private elemento: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private _documento: Document
  ) { }
  ngOnInit(): void {
    const padre: HTMLElement = this.elemento.nativeElement.parentNode;
    this.renderer.removeChild(padre, this.elemento.nativeElement, true);
    this.script = this.renderer.createElement('script');
    this.renderer.setAttribute(this.script, 'type', 'application/ld+json');
    //this.renderer.appendChild(this.elemento.nativeElement, this.script);
    this.renderer.appendChild(this._documento.head, this.script);
  }
  ngOnChanges(cambio: SimpleChanges): void {
    const json: SimpleChange = cambio['json'];
    if (!json.firstChange && json.currentValue !== json.previousValue) {
      this.renderer.setProperty(this.script, 'innerHTML', JSON.stringify(this.json));
    }
  }
}
