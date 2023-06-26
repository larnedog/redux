import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './models/todo.model';

@Pipe({
  name: 'filtroTodo'
})
export class FiltroPipe implements PipeTransform {

  transform(value: Todo[], filtro: string): Todo[] {
    switch( filtro ) {
      case 'completados': 
        return value.filter( todo => todo.completado )
      case 'pendientes':
        return value.filter( todo => !todo.completado)
      default:
        return value
    }
  }

}
