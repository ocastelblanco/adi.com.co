import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
export interface Mensaje {
  nombre: string;
  telefono: string;
  email: string;
  mensaje: string;
}
export interface Ruta {
  proyecto: string | null;
  seccion: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class EstructuraService {
  private estructura: BehaviorSubject<Estructura[]> = new BehaviorSubject<Estructura[]>([]);
  private url: string = 'https://script.google.com/macros/s/AKfycbwFiN5Zzetx5Yo2jDIu71ATSfhXwJIbxc83FT9SV8FEQcejC85F93bMTg-ybbWcIrsDVA/exec';
  private local: string = 'assets/data/data.json';
  private ruta: BehaviorSubject<Ruta> = new BehaviorSubject<Ruta>({ proyecto: null, seccion: null });
  constructor(private http: HttpClient, @Inject(DOCUMENT) private doc: Document) { }
  init(): void {
    this.http.get(this.local, { responseType: 'json' }).subscribe((dataLocal: any) => {
      this.estructura.next(dataLocal);
      this.http.get(this.url, { responseType: 'json' }).subscribe((data: any) => this.estructura.next(data));
    });
  }
  getEstructura(): BehaviorSubject<Estructura[]> {
    return this.estructura;
  }
  creaLink(nombre: string): string {
    return nombre.toLowerCase().replace(/ /g, '-');
  }
  putMensaje(data: any): Observable<any> {
    const postData: FormData = new FormData();
    Object.keys(data).forEach((key: string) => postData.append(key, data[key]));
    return this.http.post<any>(this.url, postData);
  }
  emiteRuta(ruta: Ruta): void {
    this.ruta.next(ruta);
  }
  getRuta(): BehaviorSubject<Ruta> {
    return this.ruta;
  }
  creaURLCanonica(): void {
    const lista: NodeList = document.querySelectorAll('link[rel="canonical"]');
    for (let i: number = 0; i < lista.length; i++) {
      const elemento: HTMLLinkElement = lista[i] as HTMLLinkElement;
      elemento.remove();
    }
    const link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', this.doc.URL);
  }
}
