import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddContestTemplatesComponent } from './add-contest-templates.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

const routes: Routes = [
  {
    path: '',
    component: AddContestTemplatesComponent
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MatCheckboxModule
  ],
  exports: [RouterModule]
})
export class AddContestTemplatesModule { }
