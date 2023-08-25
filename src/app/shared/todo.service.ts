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
    this.firestoreCollection = firestore.collection('todos');
  }

  addTodoWithUserId(title: string, userId: string) {
    this.firestoreCollection.add({
      title: title,
      isDone: false,
      userId: userId
    });
  }

  addTodo(title: string) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.addTodoWithUserId(title, userId);
      }
    });
  }

  updateTodoStatus(id: string, newStatus: boolean) {
    this.firestoreCollection.doc(id).update({ isDone: newStatus });
  }

  deleteTodo(id: string) {
    this.firestoreCollection.doc(id).delete();
  }
}
