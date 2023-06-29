import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuariosActions from '../actions/usuarios.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";


@Injectable()
export class UsuariosEffects {

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap( 
                () => this.usuariosService.getUsers()
                    .pipe(
                        map( users => usuariosActions.cargarUsuariosSuccess( { usuarios: users }) ),
                        catchError( err => of(usuariosActions.cargarUsuariosFail( { payload: err })) )
                    )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) {}
}