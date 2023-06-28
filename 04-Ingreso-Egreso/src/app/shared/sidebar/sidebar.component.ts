import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{

  username!: string | undefined;
  userSubs!: Subscription 

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { 
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter( ({ user }) => user != null)
      )
      .subscribe( ({ user }) => this.username = user?.nombre)
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe()
  }

  loggout() {
    Swal.fire({
      title: 'Cerrando sesión',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    this.authService.loggout()
      .then( () => {
        Swal.close()
        this.router.navigate(['/login'])
      })
  }
}
