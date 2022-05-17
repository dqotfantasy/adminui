import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinnersRoutingModule } from './winners-routing.module';
import { WinnersComponent } from './winners.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [WinnersComponent],
  imports: [
    CommonModule,
    WinnersRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatPaginatorModule
  ]
})
export class WinnersModule {
}
