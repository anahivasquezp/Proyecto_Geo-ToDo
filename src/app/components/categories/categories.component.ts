import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  selectedColor: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private afAuth: AngularFireAuth,
  ) { }

  onClick(
    nameInput: HTMLInputElement, 
    //colorInput: HTMLSelectElement,
    ) {
    if (nameInput.value && this.selectedColor) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          const userId = user.uid;
          this.categoriesService.addCategory(userId, nameInput.value, this.selectedColor);
          nameInput.value = "";
          this.selectedColor = "";
        }
      });
    }
  }

}
