import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTeamComponent } from './edit-team.component';

const routes: Routes = [{
  path: '',
  component: EditTeamComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditTeamRoutingModule { }
