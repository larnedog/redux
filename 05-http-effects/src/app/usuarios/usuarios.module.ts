import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [
    ListComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ListComponent,
    UsuarioComponent
  ]
})
export class UsuariosModule { }
