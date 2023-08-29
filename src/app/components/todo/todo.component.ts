import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from '../../services/categories.service';

declare var google: any; // Declaración de la variable global google

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: string = '';
  selectedCategoryColor: string = '';

  @ViewChild('locationInput') locationInput!: ElementRef<HTMLInputElement>;

  constructor(
    private todoService: TodoService,
    private categoriesService: CategoriesService,
    private afAuth: AngularFireAuth,
   // private renderer: Renderer2
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
    if (nameInput.value && this.selectedCategory && this.selectedCategoryColor) {
      this.afAuth.authState.subscribe((user) => {
        if (user && dateInput) {
          const userId = user.uid;
          this.todoService.addTask(
            userId,
            nameInput.value,
            descriptionInput.value,
            dateInput.value,
            locationInput.value,
            this.selectedCategory,
            this.selectedCategoryColor
          );
          nameInput.value = '';
          descriptionInput.value = '';
          dateInput.value = '';
          locationInput.value = '';
          this.selectedCategory = '';
          this.selectedCategoryColor = '';
        }
      });
    }
  }
}
