import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferalUserlistComponent } from './referal-userlist.component';

const routes: Routes = [{
  path:'',
  component:ReferalUserlistComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferalUserlistRoutingModule { }
