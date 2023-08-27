import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.firestoreCollection = firestore.collection('categories');
  }

  addCategory(
    userId: string,
    category_name: string, 
    category_color: string,
    ) {
    this.firestoreCollection.add({
      userId: userId,
      category_name: category_name,
      category_color: category_color, 
    });
  }


  
}
