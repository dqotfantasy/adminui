import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllViewcronComponent } from './all-viewcron.component';

const routes: Routes = [{
  path:'',
  component:AllViewcronComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllViewcronRoutingModule { }
