import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromoterRoutingModule } from './promoter-routing.module';
import { PromoterComponent } from './promoter.component';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {DelayInputModule} from '../_directive/delay-input.module';
import { PromoterIncomeComponent } from './promoter-income/promoter-income.component';

@NgModule({
  declarations: [ PromoterComponent, PromoterIncomeComponent ],
  imports: [
    CommonModule,
    PromoterRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    FormsModule,
    DelayInputModule
  ]
})
export class PromoterModule { }
