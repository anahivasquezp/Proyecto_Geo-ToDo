import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: any[] = [];

  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
    ) { }

    ngOnInit(): void {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const userId = user.uid;
          this.todoService.firestoreCollection
            .valueChanges({ idField: 'id' })
            .subscribe(items => {
              this.todos = items
                .filter(item => item.userId === userId)
                .sort((a: any, b: any) => a.isDone - b.isDone);
            });
        }
      });
    }

  /*onClick(titleInput: HTMLInputElement) {
    if (titleInput.value) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const userId = user.uid;
          this.todoService.addTodoWithUserId(titleInput.value, userId);
          titleInput.value = "";
        }
      });
    }
  }*/

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }

}
