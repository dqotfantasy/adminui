import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CouponsRoutingModule} from './coupons-routing.module';
import {CouponsComponent} from './coupons.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    CouponsComponent
  ],
  imports: [
    CommonModule,
    CouponsRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class CouponsModule {
}
