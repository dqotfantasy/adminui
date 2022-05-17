import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormModalComponent} from './form-modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmComponent} from '../confirm/confirm.component';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {FieldFileComponent} from '../field-file/field-file.component';
import {FieldSelectSearchComponent} from '../field-select-search/field-select-search.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatSelectModule} from '@angular/material/select';
import {NgArrayPipesModule} from 'ngx-pipes';
import {MatIconModule} from '@angular/material/icon';
import {FieldRepeatComponent} from '../field-repeat/field-repeat.component';
import {FilterComponent} from '../filter/filter.component';
import {FormlyMatToggleModule} from '@ngx-formly/material/toggle';
import {FieldChipComponent} from '../field-chip/field-chip.component';
import {MatChipsModule} from '@angular/material/chips';
import {NumberOnlyModule} from '../../_directive/number-only.module';
import {MatNativeDateModule} from '@angular/material/core';
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FieldEditorComponent} from '../field-editor/field-editor.component';
import {QuillModule} from 'ngx-quill';
import {MatQuillModule} from '../field-editor/mat-quill/mat-quill-module';

export function minlengthValidationMessage(err, field) {
  return `This value must have at least ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value must be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value must be greater than or equal to ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value must be less than or equal to ${field.templateOptions.max}`;
}

export function fieldMatchValidator(control: AbstractControl) {
  const {password, password_confirmation} = control.value;

  // avoid displaying the message error when values are empty
  if (!password_confirmation || !password) {
    return null;
  }

  if (password_confirmation === password) {
    return null;
  }

  return {fieldMatch: {message: 'Password does not match'}};
}

@NgModule({
  declarations: [
    FormModalComponent,
    ConfirmComponent,
    FieldFileComponent,
    FieldSelectSearchComponent,
    FieldRepeatComponent,
    FieldChipComponent,
    FilterComponent,
    FieldEditorComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormlyModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
    FormlyMatToggleModule,
    FormlyModule.forRoot({
      validators: [
        {name: 'fieldMatch', validation: fieldMatchValidator},
      ],
      validationMessages: [
        {name: 'required', message: 'This field is required'},
        {name: 'minlength', message: minlengthValidationMessage},
        {name: 'maxlength', message: maxlengthValidationMessage},
        {name: 'min', message: minValidationMessage},
        {name: 'max', message: maxValidationMessage},
      ],
      extras: {immutable: true},
      types: [
        {name: 'file', component: FieldFileComponent, wrappers: ['form-field']},
        {name: 'select-search', component: FieldSelectSearchComponent, wrappers: ['form-field']},
        {name: 'repeat', component: FieldRepeatComponent},
        {name: 'chip', component: FieldChipComponent, wrappers: ['form-field']},
        {
          name: 'editor', component: FieldEditorComponent, wrappers: ['form-field']
        },
      ],
    }),
    FormlyMaterialModule,
    NgxMatSelectSearchModule,
    NgArrayPipesModule,
    FormsModule,
    MatIconModule,
    MatChipsModule,
    NumberOnlyModule,
    MatTooltipModule,
    QuillModule,
    MatQuillModule
  ],
  entryComponents: [FormModalComponent, ConfirmComponent, FilterComponent]
})
export class FormModalModule {
}
