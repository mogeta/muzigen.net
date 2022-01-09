import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ArticleComponent} from './components/article/article.component';
import {MarkdownModule} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {PostsComponent} from './components/posts/posts.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {CommonModule} from '@angular/common';
import {getAnalytics, provideAnalytics} from '@angular/fire/analytics';
import {NgcCookieConsentConfig, NgcCookieConsentModule} from 'ngx-cookieconsent';
import {environment} from '../environments/environment';
import { ScullyLibModule } from '@scullyio/ng-lib';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
    domain: environment.domain
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};
const firebaseConfig = {
  apiKey: 'AIzaSyBzo-nTtnYzydswTuDmiizwgLn5GRIrz9Q',
  authDomain: 'muzigen-net.firebaseapp.com',
  databaseURL: 'https://muzigen-net.firebaseio.com',
  projectId: 'muzigen-net',
  storageBucket: 'muzigen-net.appspot.com',
  messagingSenderId: '411627681827',
  appId: '1:411627681827:web:3c7978229b9e6256795996',
  measurementId: 'G-3W5TEDXSSX'
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    MarkdownModule.forRoot({loader: HttpClient}),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    // ScullyLibModule
    ScullyLibModule.forRoot({
      useTransferState: true,
      alwaysMonitor: false,
      manualIdle: true,
    })
    // provideAnalytics(() => initializeAnalytics( initializeApp(firebaseConfig))),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
