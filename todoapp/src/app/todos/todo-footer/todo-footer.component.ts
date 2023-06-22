import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {

  filtroActual: string = 'todos';
  filtros: string[] = ['todos', 'completados', 'pendientes']

  constructor(private store: Store<AppState>) {
    this.store.select('filtro').subscribe( filtro => this.filtroActual = filtro)
  }

  cambiarFiltro(filtro: string) {
    this.store.dispatch( actions.setFiltro( {filtro: filtro } ))
  }
}
