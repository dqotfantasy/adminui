import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CompetitionsRoutingModule} from './competitions-routing.module';
import {CompetitionsComponent} from './competitions.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DelayInputModule} from '../_directive/delay-input.module';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LeaderboardDetailsComponent } from './leaderboard/leaderboard-details/leaderboard-details.component';


@NgModule({
  declarations: [CompetitionsComponent, LeaderboardComponent,LeaderboardDetailsComponent],
  imports: [
    CommonModule,
    CompetitionsRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule,
    MatPaginatorModule,
    DelayInputModule
  ]
})
export class CompetitionsModule {
}
