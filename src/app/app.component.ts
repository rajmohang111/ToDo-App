import { Component } from '@angular/core';
import {Todo} from './todo';
import {TodoService} from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoService]
})
export class AppComponent {
  
  newTodo: Todo = new Todo();

  todos: Todo[] = [];


  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.todoService
        .getAllTodos()
        .subscribe(todos => this.todos =todos);
  }

  addTodo() {
    

    if(this.newTodo.title.trim() != "") {

        this.todoService.addTodo(this.newTodo).subscribe(todo => this.todos = todo );
        this.newTodo = new Todo();
    }
  }

  toggleTodoComplete(todo) {
   console.log("updatedTodo", todo);

    this.todoService.toggleTodoComplete(todo).subscribe(todo => this.todos = todo );
  }

  removeTodo(todo) {

    this.todoService.deleteTodoById(todo.id).subscribe(todo => this.todos = todo);

  }

  /*
  get todos() {
    return this.todoService.getAllTodos();
  } */



}
