import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ContenedorComponent } from './contenedor/contenedor.component';
import { HeaderComponent } from './vistas/header/header.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { SeccionComponent } from './vistas/seccion/seccion.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorComponent,
    HeaderComponent,
    InicioComponent,
    SeccionComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxJsonLdModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
