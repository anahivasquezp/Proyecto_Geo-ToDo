import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';




@NgModule({
  declarations: [TodoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([      
      { path: 'todo-main', component: TodoComponent, canActivate: [AuthGuard] },
    ]),
  ],
  exports: [TodoComponent],
})
export class TodosModule { }
