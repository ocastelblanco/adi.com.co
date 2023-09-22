import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { SeccionComponent } from './vistas/seccion/seccion.component';
import { ContactenosComponent } from './vistas/contactenos/contactenos.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contactenos', component: ContactenosComponent },
  { path: 'seccion/:seccion', component: SeccionComponent },
  { path: 'seccion/:seccion/:proyecto', component: SeccionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
