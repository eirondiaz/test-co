import { EditarComponent } from './components/editar/editar.component';
import { VerComponent } from './components/ver/ver.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { ListaComponent } from './components/lista/lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'lista',
    component: ListaComponent
  },
  {
    path: 'nuevo',
    component: NuevoComponent
  },
  {
    path: 'ver/:id',
    component: VerComponent
  },
  {
    path: 'lista',
    component: EditarComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/lista'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
