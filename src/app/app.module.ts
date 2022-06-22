import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";

import { ContenedorComponent } from './contenedor/contenedor.component';
import { HeaderComponent } from './vistas/header/header.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { SeccionComponent } from './vistas/seccion/seccion.component';
import { ContactenosComponent } from './vistas/contactenos/contactenos.component';
import { SafePipe } from './pipes/safe.pipe';
import { ErrorInterceptor } from './interceptadores/error.interceptor';
import { JsonLdDirective } from './directivas/json-ld.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorComponent,
    HeaderComponent,
    InicioComponent,
    SeccionComponent,
    SafePipe,
    ContactenosComponent,
    JsonLdDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    RecaptchaV3Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LdE31ogAAAAACHZF0rq29cPFbJyylQbrNIAesaW'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
