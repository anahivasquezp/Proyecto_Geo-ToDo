import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from 'src/app/services/categories.service';

declare var google: any; // Declaración de la variable global google

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

  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;

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

    //Cargar el id de la tarea enviado por params
    this.route.params.subscribe((params:Params)=> {
      this.taskId = params['idTask'];
    })

    //se puede hacer un servicio para hacer el get y solo mandar el id
    this.todoService.firestoreCollection.doc(this.taskId).get().subscribe(snapshot => {
      if (snapshot.exists) {
        this.selectedTask = snapshot.data();
      } else {
        this.selectedTask = null;
      }
    });
  }

  ngAfterViewInit() {
    this.initAutocomplete();
  }

  initAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.locationInput.nativeElement,
      { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place && place.geometry) {
        console.log(place);
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
    if (nameInput.value) {
      //Revisar si esto sirve
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
