import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListsystemUserRoutingModule } from './listsystem-user-routing.module';
import { ListsystemUserComponent } from './listsystem-user.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ ListsystemUserComponent ],
  imports: [
    CommonModule,
    ListsystemUserRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule
  ]
})
export class ListsystemUserModule { }
