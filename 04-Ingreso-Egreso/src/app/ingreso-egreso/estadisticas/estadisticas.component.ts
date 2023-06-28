import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

import { Store  } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';

import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AppStateWithIngreso } from '../ingreso-egreso.reducers';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{

  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: []
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store: Store<AppStateWithIngreso>) {}

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => this.generarEstadistica( items ))
  }

  generarEstadistica( items: IngresoEgreso[] ) {

    this.totalEgresos = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for (const item of items) {
      if( item.tipo === 'ingreso') {
        this.totalIngresos += item.monto
        this.ingresos++;
      } else {
        this.totalEgresos += item.monto
        this.egresos++
      }
    }

    this.doughnutChartData.labels = this.doughnutChartLabels
    this.doughnutChartData.datasets = [ { data: [ this.totalIngresos, this.totalEgresos ] }]
  }
}
