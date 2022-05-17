import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FantasyPointsRoutingModule} from './fantasy-points-routing.module';
import {FantasyPointsComponent} from './fantasy-points.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {NgArrayPipesModule} from 'ngx-pipes';


@NgModule({
  declarations: [FantasyPointsComponent],
  imports: [
    CommonModule,
    FantasyPointsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    NgArrayPipesModule
  ]
})
export class FantasyPointsModule {
}
