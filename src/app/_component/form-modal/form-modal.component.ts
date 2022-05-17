import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = [];
  model: any = {};
  options: FormlyFormOptions = {};
  url: string;
  method: 'POST' | 'PUT';
  title = '';
  saveButton = 'Save';
  returnResponse = false;

  constructor(private api: ApiService, public dialogRef: MatDialogRef<FormModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data, public dataService: DataService) {
    if (data.options.hasOwnProperty('options')) {
      this.options = data.options.options;
    }
  }

  ngOnInit() {
    // this.model = {};
    this.model = this.data.model;
    this.method = this.data.method;
    this.url = this.data.url;
    this.fields = this.data.fields;
    if (this.data.options.hasOwnProperty('title')) {
      this.title = this.data.options.title;
    } else {
      this.title = this.method === 'PUT' ? 'Edit' : 'Add';
    }

    if (this.data.options.hasOwnProperty('saveButton')) {
      this.saveButton = this.data.options.saveButton;
    }

    if (this.data.options.hasOwnProperty('returnResponse')) {
      this.returnResponse = this.data.options.returnResponse;
    }
  }

  save() {
    if (this.form.valid) {
      if (this.method === 'PUT') {
        this.api.put(this.url, this.form.value).subscribe((value) => {
          if (value.status) {
            if (this.returnResponse) {
              this.close(value);
            } else {
              this.close(true);
            }
          }
        });
      } else {
        this.api.post(this.url, this.form.value).subscribe((value) => {
          if (value.status) {
            if (this.returnResponse) {
              this.close(value);
            } else {
              this.close(true);
            }
          }
        });
      }
    }
  }

  close(result = false) {
    this.dialogRef.close(result);
  }
}
