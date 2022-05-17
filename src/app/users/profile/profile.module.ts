import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileComponent} from './profile.component';
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
import {FixturesModule} from '../../fixtures/fixtures.module';
import {ImageViewerModule} from '@hallysonh/ngx-imageviewer';


@NgModule({
  declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
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
        FixturesModule,
        ImageViewerModule,
    ]
})
export class ProfileModule {
}
