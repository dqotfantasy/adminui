import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewcronComponent } from './viewcron.component';
const routes: Routes = [{
  path :'',
  component : ViewcronComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewcronRoutingModule { }
