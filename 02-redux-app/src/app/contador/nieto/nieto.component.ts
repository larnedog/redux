import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from 'src/app/contador/contador.actions'

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.css']
})
export class NietoComponent {

  contador!: number 

  constructor(private store: Store<AppState>) {
    this.store.select('contador').subscribe(contador => this.contador = contador)
  }

  reset() {
    this.store.dispatch( actions.reset() )
  }
}
