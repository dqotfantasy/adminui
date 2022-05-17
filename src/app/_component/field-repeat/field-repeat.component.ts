import {Component} from '@angular/core';
import {FieldArrayType} from '@ngx-formly/core';

@Component({
  selector: 'app-field-repeat',
  templateUrl: './field-repeat.component.html',
  styleUrls: ['./field-repeat.component.scss']
})
export class FieldRepeatComponent extends FieldArrayType {

  constructor() {
    super();
  }
}
