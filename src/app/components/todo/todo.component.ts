import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent {

  todos: any[] = [];

  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
    ) { }

  onClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLInputElement,
    dateInput: HTMLInputElement,
    locationInput: HTMLInputElement,
    ) {
    if (nameInput.value) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const userId = user.uid;
          this.todoService.addTodoWithUserId(userId, nameInput.value, descriptionInput.validationMessage, dateInput.value, locationInput.value);
          nameInput.value = "";
          descriptionInput.value = "";
          dateInput.value = "";
          locationInput.value = "";
        }
      });
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }

}
