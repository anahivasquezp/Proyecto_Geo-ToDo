import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { TodoComponent } from './components/todo/todo.component';
import { SecurityModule } from './security/security.module';
import { RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { LoginComponent } from './security/login/login.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    PageNotFoundComponent,
    NavbarComponent,
    CategoriesComponent,
    TodoListComponent,
    CategoriesListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    SecurityModule,
    RouterModule.forRoot([
      { path : '', component: LoginComponent},
      { path : 'home', component: HomeComponent},
      { path: 'add-task', component: TodoComponent},
      { path: 'add-categories', component: CategoriesComponent},
      { path: '**', component: PageNotFoundComponent },
      
    ]),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
