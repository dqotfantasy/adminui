import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EarningMangerComponent} from './earning-manager.component';

const routes: Routes = [{
  path:'',
  component:EarningMangerComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarningMangerRoutingModule { }
