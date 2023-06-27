import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private authService: AuthService, private router: Router) {}

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
