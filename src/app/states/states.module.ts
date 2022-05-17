import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatesRoutingModule} from './states-routing.module';
import {StatesComponent} from './states.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [StatesComponent],
  imports: [
    CommonModule,
    StatesRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class StatesModule {
}
