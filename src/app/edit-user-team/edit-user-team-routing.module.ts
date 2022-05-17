import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditUserTeamComponent} from './edit-user-team.component'
const routes: Routes = [{
  path:'',
  component:EditUserTeamComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserTeamRoutingModule { }
