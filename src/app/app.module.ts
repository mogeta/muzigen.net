import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './components/article/article.component';
import {AngularFireModule} from '@angular/fire';
declare var firebase: any;  // add

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase.apps[0].options_)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
