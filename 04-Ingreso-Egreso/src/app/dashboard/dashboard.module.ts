import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { authGuard } from '../services/auth.guard';
import { SharedModule } from '../shared/shared.module';

const rutasHijas: Routes = [
  { 
    path: '', 
    component: DashboardComponent, 
    children: dashboardRoutes,
    // canActivate: [ authGuard ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild( rutasHijas )
  ],
  exports: [ RouterModule ]
})
export class DashboardModule { }
