import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FantasyPointsComponent} from './fantasy-points.component';


const routes: Routes = [{
  path: '',
  component: FantasyPointsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FantasyPointsRoutingModule {
}
