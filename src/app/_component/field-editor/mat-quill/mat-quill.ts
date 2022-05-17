import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {_MatQuillBase} from './mat-quill-base';

// Increasing integer for generating unique ids for mat-quill components.
let nextUniqueId = 0;

const SELECTOR = 'mat-quill';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mat-quill',
  exportAs: 'matQuill',
  template: `
    <ng-content select="[quill-editor-toolbar]"></ng-content>
    <ng-content></ng-content>
  `,
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disabled'],
  providers: [{provide: MatFormFieldControl, useExisting: MatQuill}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:component-class-suffix
export class MatQuill extends _MatQuillBase {

  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_required: boolean | string | null | undefined;
  controlType = SELECTOR;
  @HostBinding() id = `${SELECTOR}-${nextUniqueId++}`;
}
