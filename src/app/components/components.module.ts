import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { FilterCategoriesComponent } from './filter-categories/filter-categories.component';



@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
    HomeComponent,
    TodoComponent,
    TodoListComponent,
    NavbarComponent,
    UpdateTodoComponent,
    FilterCategoriesComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      { path: 'add-task', component: TodoComponent, canActivate: [AuthGuard]},
      { path: 'add-categories', component: CategoriesComponent, canActivate: [AuthGuard]},   
      { path: 'update-task/:idTask', component: UpdateTodoComponent, canActivate: [AuthGuard]},   
      { path: 'home/:categoryName', component: FilterCategoriesComponent, canActivate: [AuthGuard]},
    ]),
  ],
  exports: [
    CategoriesComponent,
    CategoriesListComponent,
    HomeComponent,
    TodoComponent,
    TodoListComponent,
    NavbarComponent,
  ]
})
export class ComponentsModule { }
