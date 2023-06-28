import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store'
import { Subscription, filter } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  userSubs!: Subscription
  ingresosSubs!: Subscription

  constructor( private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) {}

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
                      .pipe(
                        filter( auth => auth.user != null )
                      )
                      .subscribe( ({ user }) => {
                        this.ingresosSubs = this.ingresoEgresoService.initIngresoEgresoListener(user!.uid)
                                            .subscribe( (ingresosEgresos: any[]) => {
                                              this.store.dispatch( ingresoEgresoActions.setItems( { items: ingresosEgresos }) )
                                            })
                      })
  }

  ngOnDestroy(): void {
    this.userSubs?.unsubscribe()
    this.ingresosSubs?.unsubscribe()
  }
}
