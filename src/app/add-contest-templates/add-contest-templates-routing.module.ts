import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContestTemplatesComponent } from './add-contest-templates.component';


const routes: Routes = [{
  path: '',
  component: AddContestTemplatesComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule {
}
