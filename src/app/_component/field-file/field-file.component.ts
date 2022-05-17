import {Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/material';

@Component({
  selector: 'app-field-file',
  templateUrl: './field-file.component.html',
  styleUrls: ['./field-file.component.scss']
})
export class FieldFileComponent extends FieldType implements OnInit {
  multiple: any = false;

  ngOnInit() {
    setTimeout(() => {
      this.multiple = this.to.multiple;
    }, 100);
  }

  setValue(target) {
    if (target.files.length > 0) {
      this.formControl.setValue(target.files[0]);
    }
  }
}
