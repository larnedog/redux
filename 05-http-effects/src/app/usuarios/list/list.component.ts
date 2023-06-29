import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  usuarios: Usuario[] =  []
  loading: boolean = false;
  error: any

  constructor( private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.select('usuarios').subscribe( ({users, loading, error}) => {
      this.usuarios = users
      this.loading = loading
      this.error = error
    })

    this.store.dispatch( cargarUsuarios() )
    /*this.usuariosService.getUsers().subscribe( data => {
      console.log(data)
      this.usuarios = data
    })*/
  }
}
