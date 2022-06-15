import { Component, OnInit } from '@angular/core';
import { EstructuraService, Mensaje } from 'src/app/servicios/estructura.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'adi-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.scss'],
  animations: [
    trigger('contenido', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.5s ease-in-out', style({
          opacity: 1,
          transform: 'translateY(0px)'
        }))
      ])
    ]),
  ]
})
export class ContactenosComponent implements OnInit {
  schema: any = {};
  mensaje: Mensaje = { nombre: '', telefono: '', email: '', mensaje: '' };
  alertaMensaje: string = '';
  contacto = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(5)]),
    telefono: new FormControl('', [Validators.pattern('[0-9\+ ]*'), Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mensaje: new FormControl('', [Validators.required]),
  });
  constructor(private data: EstructuraService, private recaptchaV3Service: ReCaptchaV3Service) { }
  ngOnInit(): void {
    this.schema = {
      '@context': 'http://schema.org',
      '@type': 'ContactPage',
      'name': 'A+DI - Contáctenos',
      'url': 'https://adi.com.co/contactenos',
      'description': '¿Qué podemos hacer por usted?',
    };
  }
  enviarMensaje() {
    this.alertaMensaje = 'info';
    this.recaptchaV3Service.execute('contactenos')
      .subscribe({
        next: (token: string) => {
          this.mensaje.nombre = this.contacto.get('nombre')?.value;
          this.mensaje.email = this.contacto.get('email')?.value;
          this.mensaje.telefono = this.contacto.get('telefono')?.value;
          this.mensaje.mensaje = this.contacto.get('mensaje')?.value;
          this.data.putMensaje(this.mensaje)
            .subscribe({
              next: (resp: any) => {
                this.mensaje = { nombre: '', telefono: '', email: '', mensaje: '' };
                this.contacto.reset();
                if (resp.error === null) {
                  this.alertaMensaje = 'success';
                } else {
                  this.alertaMensaje = 'danger';
                }
              },
              error: (err: any) => {
                console.log('Error de CORS, pero no es incapacitante', err);
                this.mensaje = { nombre: '', telefono: '', email: '', mensaje: '' };
                this.contacto.reset();
                this.alertaMensaje = 'success';
              }
            });
        },
        error: (error: any) => {
          this.alertaMensaje = 'danger';
        },
      });
  }
}
