import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.firestoreCollection = firestore.collection('prueba');
  }

  addTodoWithUserId(
    userId: string,
    task_name: string, 
    task_description : string,
    task_date: string,
    //isDone: boolean,
    task_location: string,
    selectedCategory: string
    ) {
    this.firestoreCollection.add({
      userId: userId,
      task_name: task_name, 
      task_description : task_description,
      task_date: task_date,
      isDone: false,
      task_location: task_location,
      selectedCategory: selectedCategory,
    });
  }

  /*addTodo(title: string) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.addTodoWithUserId(title, userId);
      }
    });
  }*/

  updateTodoStatus(id: string, newStatus: boolean) {
    this.firestoreCollection.doc(id).update({ isDone: newStatus });
  }

  deleteTodo(id: string) {
    this.firestoreCollection.doc(id).delete();
  }

}
