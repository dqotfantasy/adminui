import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WalletRoutingModule} from './wallet-routing.module';
import {WalletComponent} from './wallet.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {PaymentsModule} from '../../payments/payments.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import {ImageViewerModule} from '@hallysonh/ngx-imageviewer';
import {DelayInputModule} from '../../_directive/delay-input.module';


@NgModule({
  declarations: [WalletComponent],
    imports: [
        CommonModule,
        WalletRoutingModule,
        MatTabsModule,
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule,
        FormlyModule,
        MatButtonModule,
        MatExpansionModule,
        MatToolbarModule,
        MatTooltipModule,
        MatDialogModule,
        PaymentsModule,
        ImageViewerModule,
        FormsModule,
        DelayInputModule,
        MatPaginatorModule
    ]
})
export class WalletModule {
}
