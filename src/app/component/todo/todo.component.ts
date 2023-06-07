import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faCircle, faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faPencil, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent {
  faCircle = faCircle;
  faCheck = faCheck;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faPencil = faPencil;
  faTrash = faTrash;

  constructor(private todosService: TodoService, private route: ActivatedRoute) { }

  categoryId: string = '';
  todos: Array<any> = [];
  buttonStatus: string = "Add";
  todoId: string = "";
  tododescription: string = "";

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') as string;
    this.todosService.getTodos(this.categoryId).subscribe((val) => {
      this.todos = val;
    });
  }

  onSubmit(f: NgForm) {
    let todos = {
      todo: f.value.todo,
      isCompleted: false
    }
    if (this.buttonStatus == "Add") {
      this.todosService.saveTodo(todos, this.categoryId);
      console.log(this.categoryId);
    } else {
      this.todosService.updateTodos(this.categoryId, this.todoId, todos.todo);
      this.buttonStatus = "Add";
    }
    f.resetForm();
  }

  onEdit(todoId: string, todo: string) {
    this.buttonStatus = "Edit";
    this.todoId = todoId;
    this.tododescription = todo;
  }

  onDelete(todoId:string){
    this.todosService.deleteTodos(this.categoryId,todoId);
  }
 
  onCompleted(id:string){
    this.todosService.markCompleted(this.categoryId,id);
  }
  onUnCompleted(id:string){
    this.todosService.markUnCompleted(this.categoryId,id);
  }
}
