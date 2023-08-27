import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';


import { SecurityModule } from './security/security.module';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    SecurityModule,
    ComponentsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    
    RouterModule.forRoot([
      { path : '', redirectTo: 'home', pathMatch: 'full'},
      { path: '**', component: PageNotFoundComponent },      
    ]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
