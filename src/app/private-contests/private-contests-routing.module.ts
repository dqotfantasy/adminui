import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateContestsComponent } from './private-contests.component';


const routes: Routes = [
  {
    path: '',
    component: PrivateContestsComponent
  },
  {
    path: 'private-contest-detail/:privateContestId',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateContestsRoutingModule {
}
