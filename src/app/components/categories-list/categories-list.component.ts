import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories: any[] = [];
  userId!: string;

  constructor(
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
  }

}
