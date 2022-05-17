import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FixturesComponent} from './fixtures.component';


const routes: Routes = [{
    path: '',
    component: FixturesComponent
  },
  {
    path: 'fixture-detail/:fixtureId',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixturesRoutingModule {
}
