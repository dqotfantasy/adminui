import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubadminCreateRoutingModule } from './subadmin-create-routing.module';
import { SubadminCreateComponent } from './subadmin-create.component'
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [SubadminCreateComponent],
  imports: [
    CommonModule,
    SubadminCreateRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule
  ]
})
export class SubadminCreateModule { }
