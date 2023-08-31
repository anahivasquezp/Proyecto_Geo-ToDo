import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../../services/todo.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { AuthService } from 'src/app/services/auth.service';

declare var google: any; // Declaración de la variable global google

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss']
})
export class UpdateTodoComponent implements OnInit {
  userId!: string;
  selectedTask: any ={};
  taskId!: string;
  categories: any[] = [];
  selectedIdCategory: string = '';
  selectedCategory: string = '';
  selectedCategoryColor: string = '';

  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    //Cargar el ID del usuario
    this.userId = this.authService.getAuthenticatedUserId();
    //Cargar tareas 
    this.categoriesService.getCategoriesByUserId(this.userId)
      .subscribe((filteredCategories: any[]) => {
        this.categories = filteredCategories;
      });

    //Cargar el id de la tarea enviado por params
    this.route.params.subscribe((params:Params)=> {
      this.taskId = params['idTask'];
    })

    //Obtener la tarea que se desea actualizar en base al id del param
    this.todoService.getTaskById(this.taskId).subscribe(document => {
      if (document.exists) {
        this.selectedTask = document.data();
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
          this.todoService.updateTask(
            id.value,
            nameInput.value,
            descriptionInput.value,
            dateInput.value,
            locationInput.value,
            this.selectedIdCategory?this.selectedIdCategory:this.selectedTask.id_category,
            this.selectedCategory?this.selectedCategory:this.selectedTask.selectedCategory,
            this.selectedCategoryColor?this.selectedCategoryColor:this.selectedTask.selectedCategoryColor
          );
          nameInput.value = '';
          descriptionInput.value = '';
          dateInput.value = '';
          locationInput.value = '';
          this.selectedIdCategory = '';
          this.selectedCategory = '';
          this.selectedCategoryColor = '';
    }
  }
}
