import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  userId!: string;
  selectedColor: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    //Cargar el id del usuario autenticado
    this.userId = this.authService.getAuthenticatedUserId();
  }

  onClick(
    nameInput: HTMLInputElement, 
    ) {
    if (nameInput.value && this.selectedColor) {
          this.categoriesService.addCategory(this.userId, nameInput.value, this.selectedColor);
    }
  }

}
