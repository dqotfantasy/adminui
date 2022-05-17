import {Component, OnInit, ViewChild} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {ContentChange} from 'ngx-quill';
import {MatQuill} from './mat-quill/mat-quill';

@Component({
  selector: 'app-field-editor',
  templateUrl: './field-editor.component.html',
  styleUrls: ['./field-editor.component.scss']
})
export class FieldEditorComponent extends FieldType implements OnInit {
  @ViewChild('matEditor', {
    static: true
  }) matEditor: MatQuill;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.model.hasOwnProperty(this.key)) {
      // @ts-ignore
      this.matEditor.content = this.model[this.key];
    }
  }

  setContent($event: ContentChange) {
    this.formControl.setValue($event.html);
  }

}
