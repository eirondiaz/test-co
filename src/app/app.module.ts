import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaComponent } from './components/lista/lista.component';
import { NuevoComponent } from './components/nuevo/nuevo.component';
import { EditarComponent } from './components/editar/editar.component';
import { VerComponent } from './components/ver/ver.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    NuevoComponent,
    EditarComponent,
    VerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
