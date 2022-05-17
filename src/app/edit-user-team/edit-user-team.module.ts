import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserTeamRoutingModule } from './edit-user-team-routing.module';
import {EditUserTeamComponent} from './edit-user-team.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {NgArrayPipesModule} from 'ngx-pipes';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [EditUserTeamComponent],
  imports: [
    CommonModule,
    EditUserTeamRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    NgArrayPipesModule,
    MatCheckboxModule
  ]
})
export class EditUserTeamModule { }
