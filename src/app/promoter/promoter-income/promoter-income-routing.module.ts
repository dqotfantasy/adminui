import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoterIncomeComponent } from './promoter-income.component';

const routes: Routes = [{
  path:'',
  component:PromoterIncomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromoterIncomeRoutingModule { }
