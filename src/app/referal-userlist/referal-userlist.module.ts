import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferalUserlistRoutingModule } from './referal-userlist-routing.module';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {DelayInputModule} from '../_directive/delay-input.module';
import { ReferalUserlistComponent } from './referal-userlist.component';

@NgModule({
  declarations: [ ReferalUserlistComponent ],
  imports: [
    CommonModule,
    ReferalUserlistRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule,
    DelayInputModule
  ]
})
export class ReferalUserlistModule { }
