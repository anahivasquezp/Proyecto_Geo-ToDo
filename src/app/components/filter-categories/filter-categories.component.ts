import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css']
})
export class FilterCategoriesComponent implements OnInit {
  selectedCategory!: string;
  todos: any[] = [];
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    //Cargar el ID del usuario
    this.userId = this.authService.getAuthenticatedUserId();
    //Cargar el nombre de la categoria enviado por params
    this.route.params.subscribe((params:Params)=> {
      this.selectedCategory = params['categoryName'];
      console.log(this.selectedCategory);
      //Cargamos las tareas con el id y la categoria
      this.todoService.getTasksByCategories(this.userId, this.selectedCategory)
        .subscribe((filteredTasks: any[]) => {
          this.todos = filteredTasks;
        });
    });
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }

}
