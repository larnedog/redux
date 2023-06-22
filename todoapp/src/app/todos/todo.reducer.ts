import { createReducer, on } from "@ngrx/store";
import { crearTodo } from "./todo.actions";
import { Todo } from "./models/todo.model";

export const initialState: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Robar el escudo del capitán América'),
];

const _todoReducer = createReducer(initialState, 
    on( crearTodo, (state, { texto } ) => [...state, new Todo(texto) ])    
)

export function todoReducer(state: any, action: any) {
    return _todoReducer(state, action)
}