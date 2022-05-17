import {Component, OnInit} from '@angular/core';
import {FieldType} from '@ngx-formly/material';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-field-file',
  templateUrl: './field-chip.component.html',
  styleUrls: ['./field-chip.component.scss']
})
export class FieldChipComponent extends FieldType implements OnInit {
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  data = [];

  ngOnInit() {
    setTimeout(() => {
      this.data = this.value;
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    const index = this.data.indexOf(value.trim());

    if ((value || '').trim() && index === -1) {
      this.data.push(value.trim());
      this.formControl.setValue(this.data);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(d): void {
    const index = this.data.indexOf(d);

    if (index >= 0) {
      this.data.splice(index, 1);
    }

    this.formControl.setValue(this.data);
  }
}
