import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RankCategoriesComponent} from './rank-categories.component';


const routes: Routes = [{
  path: '',
  component: RankCategoriesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankCategoriesRoutingModule {
}
