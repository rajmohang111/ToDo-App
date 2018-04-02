
import { Todo } from './todo';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TodoService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for todo's
  todos: Todo[] = [];


  constructor(private http: Http) {}

  private getHeaders(){
    // I included these headers because otherwise FireFox
    // will request text/html
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }


  private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 
  
  

  // Simulate POST /todos
  addTodo(todo: Todo): Observable<Todo[]> {
     
     return this.http.post('http://localhost:8080/todos',
                             JSON.stringify(todo), 
                             {headers: this.getHeaders()}
                          ).map(res =>  res.json())
                           .catch(this.handleErrorObservable);
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): Observable<Todo[]>  {
   
    return this.http.delete('http://localhost:8080/todos/'+id,  {headers: this.getHeaders()})
                           .map(res =>  res.json())
                           .catch(this.handleErrorObservable);

  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // Simulate GET /todos
  getAllTodos(): Observable<Todo[]> {

    return this.http.get('http://localhost:8080/todos').map((response: Response) => response.json());

    // return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo): Observable<Todo[]> {


    todo.completed = !todo.completed;
    
    console.log("updatedTodo", todo);

    return this.http.put('http://localhost:8080/todos',
                             JSON.stringify(todo), 
                             {headers: this.getHeaders()}
                          ).map(res =>  res.json())
                           .catch(this.handleErrorObservable);
  }

}
