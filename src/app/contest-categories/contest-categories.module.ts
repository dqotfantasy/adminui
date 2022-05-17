import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContestCategoriesRoutingModule } from './contest-categories-routing.module';
import { ContestCategoriesComponent } from './contest-categories.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [ContestCategoriesComponent],
  imports: [
    CommonModule,
    ContestCategoriesRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class ContestCategoriesModule {
}
