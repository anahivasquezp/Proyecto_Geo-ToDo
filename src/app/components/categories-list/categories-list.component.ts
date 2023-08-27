import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: any[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.categoriesService.firestoreCollection
          .valueChanges({ idField: 'id' })
          .subscribe(items => {
            this.categories = items
              .filter(item => item.userId === userId)
              .sort((a: any, b: any) => a.isDone - b.isDone);
          });
      }
    });
  }

}
