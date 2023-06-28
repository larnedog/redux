import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  usuarios: Usuario[] =  []
  constructor( private usuariosService: UsuarioService) {}

  ngOnInit(): void {
    this.usuariosService.getUsers().subscribe( data => {
      console.log(data)
      this.usuarios = data
    })
  }
}
