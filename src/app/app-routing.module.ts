import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ArticleComponent} from './components/article/article.component';
import {PostsComponent} from './components/posts/posts.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blog', component: PostsComponent },
  { path: 'blog/:id', component: ArticleComponent },
  { path: 'labo', loadChildren: () => import('./labo/labo.module').then(m => m.LaboModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
