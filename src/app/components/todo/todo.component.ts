import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent {
  todos: any[] = [];
  categories: any[] = [];
  selectedCategory: string = ''; // Variable para almacenar la categoría seleccionada

  constructor(
    private todoService: TodoService,
    private categoriesService: CategoriesService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        const userId = user.uid;
        this.categoriesService.firestoreCollection
          .valueChanges({ idField: 'id' })
          .subscribe((items) => {
            this.categories = items
              .filter((item) => item.userId === userId)
              .sort((a: any, b: any) => a.isDone - b.isDone);
          });
      }
    });
  }

  onClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLInputElement,
    dateInput: HTMLInputElement,
    locationInput: HTMLInputElement
  ) {
    if (nameInput.value && this.selectedCategory) { // Asegurarse de que haya una categoría seleccionada
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid;
          this.todoService.addTodoWithUserId(
            userId,
            nameInput.value,
            descriptionInput.value,
            dateInput.value,
            locationInput.value,
            this.selectedCategory // Pasar la categoría seleccionada al servicio
          );
          nameInput.value = '';
          descriptionInput.value = '';
          dateInput.value = '';
          locationInput.value = '';
          this.selectedCategory = ''; // Reiniciar la categoría seleccionada
        }
      });
    }
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }

  onDelete(id: string) {
    this.todoService.deleteTodo(id);
  }
}
