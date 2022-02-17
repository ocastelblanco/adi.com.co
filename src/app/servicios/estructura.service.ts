import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Foto {
  foto: string;
  descripcion: string;
}
export interface Proyecto {
  proyecto: string;
  descripcion: string;
  fotos: Foto[];
}
export interface Estructura {
  seccion: string;
  descripcion: string;
  proyectos: Proyecto[];
}

@Injectable({
  providedIn: 'root'
})
export class EstructuraService {
  private estructura: BehaviorSubject<Estructura[]> = new BehaviorSubject<Estructura[]>([]);
  constructor(private http: HttpClient) { }
  init(): void {
    const url: string = 'https://script.google.com/macros/s/AKfycbzXCVU1WXUlFgWtS8U5ngaYPEvjLqLgKjUH8XXTFOSUdhH_EtxEWGpPDEj2zU3RwHsx/exec';
    this.http.get(url, { responseType: 'json' }).subscribe((data: any) => this.estructura.next(data));
  }
  getEstructura(): BehaviorSubject<Estructura[]> {
    return this.estructura;
  }
  creaLink(nombre: string): string {
    return nombre.toLowerCase().replace(/ /g, '-');
  }
}
