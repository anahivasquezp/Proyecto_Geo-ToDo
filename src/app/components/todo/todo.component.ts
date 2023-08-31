import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from 'src/app/services/auth.service';

declare var google: any; // Declaración de la variable global google

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  userId!: string;
  categories: any[] = [];
  selectedIdCategory: string = '';
  selectedCategory: string = '';
  selectedCategoryColor: string = '';

  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;

  constructor(
    private todoService: TodoService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    //Cargar el ID del usuario
    this.userId = this.authService.getAuthenticatedUserId();
    //Cargar tareas 
    this.categoriesService.getCategoriesByUserId(this.userId)
      .subscribe((filteredCategories: any[]) => {
        this.categories = filteredCategories;
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

  onClick(
    nameInput: HTMLInputElement,
    descriptionInput: HTMLInputElement,
    dateInput: HTMLInputElement,
    locationInput: HTMLInputElement,
  ) {
    if (nameInput.value && this.selectedCategory && this.selectedCategoryColor && this.selectedIdCategory) { //Acabar de hacer estos
          this.todoService.addTask(
            this.userId,
            nameInput.value,
            descriptionInput.value,
            dateInput.value,
            locationInput.value,
            this.selectedIdCategory,
            this.selectedCategory,
            this.selectedCategoryColor
          );
      }
    }
}
