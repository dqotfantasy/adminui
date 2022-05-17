import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardDetailsComponent } from './leaderboard-details.component';

const routes: Routes = [{
  path:'',
  component:LeaderboardDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderboardDetailsRoutingModule { }
