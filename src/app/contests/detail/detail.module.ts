import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule} from '@angular/forms';
import {DelayInputModule} from '../../_directive/delay-input.module';

@NgModule({
  declarations: [DetailComponent],
    imports: [
        CommonModule,
        DetailRoutingModule,
        MatTabsModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatToolbarModule,
        MatDialogModule,
        MatBadgeModule,
        MatPaginatorModule,
        MatChipsModule,
        FormsModule,
        DelayInputModule
    ]
})
export class DetailModule {
}
