import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  firestoreCollection: AngularFirestoreCollection;

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.firestoreCollection = firestore.collection('categories');
  }

  //Añadir Categoria
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

  //Obtener categorias por el id de un usuario
  getCategoriesByUserId(userId: string): Observable<any[]> {
    return this.firestoreCollection.valueChanges({ idField: 'id' })
      .pipe(
        map((items: any[]) => {
          return items.filter(item => item.userId === userId)
        })
      );
  }
  
}
