import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducers';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy{

  ingresosEgresos: any[] = []
  ingresosSubs!: Subscription

  constructor( private store: Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) {}

  ngOnInit(): void {
    this.ingresosSubs = this.store.select('ingresosEgresos').subscribe( ({ items }) => {
                          this.ingresosEgresos = items
                        })
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe()
  }

  borrar( uid: string | undefined) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then( () => Swal.fire('Borrado', 'Item borrado', 'success') )
      .catch(err => Swal.fire('Error', err.message, 'error'))
  }
}
