import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubadminCreateComponent } from './subadmin-create.component';
const routes: Routes = [{
  path : '',
  component : SubadminCreateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubadminCreateRoutingModule { }
