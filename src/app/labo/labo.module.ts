import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboRoutingModule } from './labo-routing.module';
import { LaboComponent } from './labo.component';


@NgModule({
  declarations: [
    LaboComponent
  ],
  imports: [
    CommonModule,
    LaboRoutingModule
  ]
})
export class LaboModule { }
