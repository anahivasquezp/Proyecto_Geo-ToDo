import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos: any[] = [];
  userId!: string;

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    ) { }

    ngOnInit(): void {
      //Cargar el ID del usuario
      this.userId = this.authService.getAuthenticatedUserId();
      //Cargar tareas 
      this.todoService.getTasksByUserId(this.userId)
        .subscribe((filteredTasks: any[]) => {
          this.todos = filteredTasks;
        });
    }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }
  
}
