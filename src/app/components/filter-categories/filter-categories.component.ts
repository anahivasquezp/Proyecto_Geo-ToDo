import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css']
})
export class FilterCategoriesComponent implements OnInit {
  selectedCategory!: string;
  todos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private todoService: TodoService,
  ) { }

  ngOnInit(): void {

    //Cargar el nombre de la categoria enviado por params
    this.route.params.subscribe((params:Params)=> {
      this.selectedCategory = params['categoryName'];
      console.log(this.selectedCategory);
      this.getTaskbyCategory();
    })

    //Cargamos las task con esa categoria
    

  }

  getTaskbyCategory(){
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.todoService.firestoreCollection
          .valueChanges({ idField: 'id' })
          .subscribe(items => {
            console.log("Items cargados");
            this.todos = items
              .filter(item => item.userId === userId && item.selectedCategory === this.selectedCategory)
              .sort((a: any, b: any) => a.isDone - b.isDone);
          });
      }
    });
  }

  onStatusChange(id: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(id, newStatus);
  }
  
  onDelete(id:string){
    this.todoService.deleteTodo(id);
  }

}
