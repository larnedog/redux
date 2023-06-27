import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { Store } from '@ngrx/store'

import Swal from 'sweetalert2'
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  cargando: boolean = false
  uiSubscription!: Subscription

  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this.uiSubscription = this.store.select('ui').subscribe( ui => {
                            this.cargando = ui.isLoading
                          })
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  logInUsuario() {
    if(this.loginForm.invalid) { return; }

    this.store.dispatch( ui.isLoading() )

    /*Swal.fire({
      title: 'Espere por favor',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      }
    })*/

    const { email, password } = this.loginForm.value;
    this.authService.logInUsuario( email, password )
      .then( credenciales => {
        console.log(credenciales)
        // Swal.close()
        this.store.dispatch( ui.stopLoading() )
        this.router.navigate(['/'])
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() )
        Swal.fire({
          icon: 'error',
          title: '',
          text: err.message,
        })
      })
  }
}
