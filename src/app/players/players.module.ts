import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlayersRoutingModule} from './players-routing.module';
import {PlayersComponent} from './players.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {DelayInputModule} from '../_directive/delay-input.module';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [PlayersComponent],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    FormsModule,
    DelayInputModule,
    MatChipsModule
  ]
})
export class PlayersModule {
}
