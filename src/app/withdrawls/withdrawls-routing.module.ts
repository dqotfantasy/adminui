import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawlsComponent } from './withdrawls.component';


const routes: Routes = [{
  path: '',
  component: WithdrawlsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawlsRoutingModule {
}
