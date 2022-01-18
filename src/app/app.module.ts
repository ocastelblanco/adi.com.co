import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { ContenedorComponent } from './contenedor/contenedor.component';
import { HeaderComponent } from './vistas/header/header.component';
import { InicioComponent } from './vistas/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorComponent,
    HeaderComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    NgxJsonLdModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
