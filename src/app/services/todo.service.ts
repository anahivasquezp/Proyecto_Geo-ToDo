import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.firestoreCollection = firestore.collection('tasks');
  }

  addTask(
    userId: string,
    task_name: string, 
    task_description : string,
    task_date: string,
    task_location: string,
    id_category: string,
    category_name: string,
    category_color: string
    ) {
    this.firestoreCollection.add({
      userId: userId,
      task_name: task_name, 
      task_description : task_description,
      task_date: task_date,
      isDone: false,
      task_location: task_location,
      id_category: id_category,
      selectedCategory: category_name,
      selectedCategoryColor: category_color,
    });
  }

  updateTask(
    id: string,
    task_name: string, 
    task_description : string,
    task_date: string,
    task_location: string,
    id_category: string,
    selectedCategory: string,
    selectedCategoryColor: string
    ) {
    this.firestoreCollection.doc(id).update({
      task_name: task_name, 
      task_description : task_description,
      task_date: task_date,
      task_location: task_location,
      id_category: id_category,
      selectedCategory: selectedCategory,
      selectedCategoryColor: selectedCategoryColor,
    });
  }

  updateTodoStatus(id: string, newStatus: boolean) {
    this.firestoreCollection.doc(id).update({ isDone: newStatus });
  }

  deleteTodo(id: string) {
    this.firestoreCollection.doc(id).delete();
  }

  //mirar para mandar al update-task
  getTaskById(id: string): Observable<any> {
    return this.firestoreCollection.doc(id).get();
  }

  //Obtener tareas por el id de un usuario
  getTasksByUserId(userId: string): Observable<any[]> {
    return this.firestoreCollection.valueChanges({ idField: 'id' })
      .pipe(
        map((items: any[]) => {
          return items.filter(item => item.userId === userId)
        })
      );
  }

  //Obtener tareas filtradas por el nombre de la categoria
  getFilteredTasksByCategories(userId: string, selectedCategory: string): Observable<any[]> {
    return this.firestoreCollection.valueChanges({ idField: 'id' }).pipe(
      map((items: any[]) => {
        return items.filter(item => item.userId === userId && item.selectedCategory === selectedCategory)
      })
    );
  }
  

}
