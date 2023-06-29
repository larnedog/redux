import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as usuarioActions from '../actions/usuario.actions'
import { catchError, map, mergeMap, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";


@Injectable()
export class UsuarioEffects {

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuarioActions.cargarUsuario ),
            mergeMap( 
                ( action ) => this.usuariosService.getUserById( action.id )
                    .pipe(
                        map( user => usuarioActions.cargarUsuarioSuccess( { usuario: user }) ),
                        catchError( err => of(usuarioActions.cargarUsuarioFail( { payload: err })) )
                    )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ) {}
}