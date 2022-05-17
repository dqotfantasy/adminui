import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinUserRoutingModule } from './join-user-routing.module';
import { JoinUserComponent } from './join-user.component'
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {DelayInputModule} from '../_directive/delay-input.module';

@NgModule({
  declarations: [ JoinUserComponent ],
  imports: [
    CommonModule,
    JoinUserRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule,
    DelayInputModule
  ]
})
export class JoinUserModule { }
