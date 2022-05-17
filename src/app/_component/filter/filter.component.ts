import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  model: any = {};
  options: FormlyFormOptions = {};
  title = 'Filter';
  resetValue = {};

  constructor(public dialogRef: MatDialogRef<FilterComponent>,
              @Inject(MAT_DIALOG_DATA) public data) {
    if (data.options.hasOwnProperty('options')) {
      this.options = data.options.options;
    }
  }

  ngOnInit() {
    this.model = this.data.model;
    this.fields = this.data.fields;
    if (this.data.options.hasOwnProperty('title')) {
      this.title = this.data.options.title;
    }
    if (this.data.options.hasOwnProperty('reset')) {
      this.resetValue = this.data.options.reset;
    }
  }

  reset() {
    const value = this.form.value;
    const result = {};
    for (const f in value) {
      if (value.hasOwnProperty(f)) {
        if (this.resetValue.hasOwnProperty(f)) {
          result[f] = this.resetValue[f];
        } else {
          result[f] = '';
        }
      }
    }

    if (this.form.valid) {
      this.dialogRef.close(result);
    }
  }

  close() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

}
