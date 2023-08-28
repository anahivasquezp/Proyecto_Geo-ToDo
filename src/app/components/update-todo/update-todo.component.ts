import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent implements OnInit {
  selectedTask: any ={};
  taskId!: string;
  categories: any[] = [];
  selectedCategory: string = '';

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private afAuth: AngularFireAuth,
    private categoriesService: CategoriesService,
  ) { }

  ngOnInit(): void {
    //Cargar categorias
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

    //Cargar la tarea
    this.route.params.subscribe((params:Params)=> {
      this.taskId = params['idTask'];
    })

    this.todoService.firestoreCollection.doc(this.taskId).get().subscribe(snapshot => {
      if (snapshot.exists) {
        this.selectedTask = snapshot.data();
      } else {
        this.selectedTask = null;
      }
    });
  }

  update(
    id: HTMLInputElement,
    nameInput: HTMLInputElement,
    descriptionInput: HTMLInputElement,
    dateInput: HTMLInputElement,
    locationInput: HTMLInputElement
  ) {
    if (nameInput.value) { // Asegurarse de que haya una categoría seleccionada
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          const userId = user.uid;
          this.todoService.updateTask(
            id.value,
            nameInput.value,
            descriptionInput.value,
            dateInput.value,
            locationInput.value,
            this.selectedCategory?this.selectedCategory:this.selectedTask.selectedCategory
          );
          nameInput.value = '';
          descriptionInput.value = '';
          dateInput.value = '';
          locationInput.value = '';
          this.selectedCategory = '';
        }
      });
    }
  }

}
