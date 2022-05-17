import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinUserComponent } from  './join-user.component';

const routes: Routes = [{
  path:'',
  component:JoinUserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinUserRoutingModule { }
