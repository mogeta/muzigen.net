import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaboComponent } from './labo.component';

const routes: Routes = [{ path: '', component: LaboComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboRoutingModule { }
