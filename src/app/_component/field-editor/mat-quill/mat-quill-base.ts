import {
  Directive,
  AfterViewInit,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  PLATFORM_ID,
  Renderer2,
  Self
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
  Validator
} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  CanDisable,
  CanDisableCtor,
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  ErrorStateMatcher,
  mixinDisabled,
  mixinErrorState
} from '@angular/material/core';
import {HasErrorState} from '@angular/material/core/common-behaviors/error-state';
import {MatFormFieldControl} from '@angular/material/form-field';
import {QuillEditorBase, QuillService} from 'ngx-quill';

// Boilerplate for applying mixins to _MatQuillBase
class MatQuillBase extends QuillEditorBase {
  constructor(
    // tslint:disable-next-line:variable-name
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    // tslint:disable-next-line:variable-name
    public _parentForm: NgForm,
    // tslint:disable-next-line:variable-name
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
    elementRef: ElementRef,
    domSanitizer: DomSanitizer,
    doc: any,
    platformId: any,
    renderer: Renderer2,
    zone: NgZone,
    service: QuillService
  ) {
    super(
      elementRef, domSanitizer, doc, platformId,
      renderer, zone, service
    );
  }
}

// tslint:disable-next-line:variable-name
const _MatQuillMixinBase: CanUpdateErrorStateCtor & CanDisableCtor & typeof MatQuillBase =
  mixinErrorState(mixinDisabled(MatQuillBase));

@Directive()
// tslint:disable-next-line:class-name directive-class-suffix
export abstract class _MatQuillBase
  extends _MatQuillMixinBase
  implements AfterViewInit, CanDisable, CanUpdateErrorState,
    ControlValueAccessor, HasErrorState,
    MatFormFieldControl<any>, OnChanges,
    OnDestroy, Validator {

  constructor(
    defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    @Optional() @Self() public ngControl: NgControl,
    elementRef: ElementRef,
    domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) doc: any,
    @Inject(PLATFORM_ID) platformId: any,
    renderer: Renderer2,
    zone: NgZone,
    service: QuillService
  ) {
    super(
      defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl,
      elementRef, domSanitizer, doc, platformId, renderer, zone, service
    );

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.onBlur.subscribe(() => {
      this.focused = false;
      this.stateChanges.next();
    });
    this.onFocus.subscribe(() => {
      this.focused = true;
      this.stateChanges.next();
    });
  }

  get empty() {
    return coerceBooleanProperty(this.value);
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get value(): any {
    try {
      // tslint:disable-next-line:no-non-null-assertion
      return this.valueGetter(this.quillEditor, this.editorElem!);
    } catch (e) {
      return;
    }
  }

  set value(value: any) {
    this.writeValue(value);
    this.stateChanges.next();
  }

  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  // tslint:disable-next-line:variable-name
  static ngAcceptInputType_required: boolean | string | null | undefined;
  abstract controlType: string;
  focused = false;
  abstract id: string;

  /*
   * GETTERS & SETTERS
   */

  @Input()
  disabled = false;

  @Input()
  placeholder: string;

  @Input()
  required = false;

  // tslint:disable-next-line:variable-name
  @HostBinding('attr.aria-describedby') _describedBy = '';

  /*
   * METHODS
   */

  blur() {
    (this.editorElem.childNodes as NodeListOf<HTMLElement>)[0].blur();
  }

  focus() {
    this.quillEditor.focus();
  }

  setDescribedByIds(ids: string[]) {
    this._describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if (!this.focused) {
      this.quillEditor.focus();
    }
  }
}
