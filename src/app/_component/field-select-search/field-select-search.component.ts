import {Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/material';

@Component({
  selector: 'app-field-select-search',
  templateUrl: './field-select-search.component.html',
  styleUrls: ['./field-select-search.component.scss']
})
export class FieldSelectSearchComponent extends FieldType implements OnInit {
  search = '';
  viewId = false;
  viewEmail = false;

  constructor() {
    super();
  }

  get labelProp(): string {
    return this.to.labelProp || 'name';
  }

  get valueProp(): string {
    return this.to.valueProp || 'id';
  }

  get filterProp(): string[] {
    return this.to.filterProp || ['name'];
  }

  ngOnInit() {
    this.viewId = this.to.hasOwnProperty('viewId');
    this.viewEmail = this.to.hasOwnProperty('viewEmail');
    super.ngOnInit();
  }
}
