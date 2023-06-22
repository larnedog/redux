import { createAction, props } from "@ngrx/store";

export const crearTodo = createAction('[TODO] Crea todo',
    props<{ texto: string }>()
)