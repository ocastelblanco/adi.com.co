import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class EstructuraService {
  private estructura: BehaviorSubject<Estructura[]> = new BehaviorSubject<Estructura[]>([]);
  private url: string = 'https://script.google.com/macros/s/AKfycbwFiN5Zzetx5Yo2jDIu71ATSfhXwJIbxc83FT9SV8FEQcejC85F93bMTg-ybbWcIrsDVA/exec';
  constructor(private http: HttpClient) { }
  init(): void {
    this.http.get(this.url, { responseType: 'json' }).subscribe((data: any) => this.estructura.next(data));
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
}
