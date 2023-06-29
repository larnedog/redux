import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const cargarUsuariosSuccess = createAction('[Usuarios] Cargar Usuarios Success',
    props<{ usuarios: Usuario[] }>()
);

export const cargarUsuariosFail = createAction('[Usuarios] Cargar Usuarios Fail',
    props<{ payload: any }>()
);