import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoterComponent } from './promoter.component';

const routes: Routes = [{
  path:'',
  component:PromoterComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoterRoutingModule { }
