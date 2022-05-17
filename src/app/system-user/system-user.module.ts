import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUserRoutingModule } from './system-user-routing.module';
import {SystemUserComponent} from './system-user.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {DelayInputModule} from '../_directive/delay-input.module';


@NgModule({
  declarations: [SystemUserComponent],
  imports: [
    CommonModule,
    SystemUserRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    DelayInputModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    FormlyModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class SystemUserModule { }
