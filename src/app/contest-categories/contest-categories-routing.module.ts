import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContestCategoriesComponent} from './contest-categories.component';

const routes: Routes = [{
  path: '',
  component: ContestCategoriesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContestCategoriesRoutingModule {
}
