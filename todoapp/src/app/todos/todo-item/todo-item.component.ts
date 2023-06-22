import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit{

  @Input() todo!: Todo
  // chkCompletado: FormControl
  // txtInput: FormControl
  // [formControl]="chkCompletado"
  // [formControl]="txtInput"

  constructor() {
    //this.chkCompletado = new FormControl( this.todo.completado );
    // this.txtInput = new FormControl(this.todo.texto, Validators.required)
  }

  ngOnInit(): void {
    
  }
}
