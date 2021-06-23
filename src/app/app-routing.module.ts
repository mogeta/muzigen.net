import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ArticleComponent} from './components/article/article.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog/articles', component: HomeComponent },
  { path: 'blog/article/:id', component: ArticleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
