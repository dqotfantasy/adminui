import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsystemUserComponent } from './listsystem-user.component';

const routes: Routes = [{
  path:'',
  component:ListsystemUserComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsystemUserRoutingModule { }
