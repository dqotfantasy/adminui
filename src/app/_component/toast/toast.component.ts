import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  title = '';
  message = '';
  icon = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data) {
  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
    this.icon = this.data.icon;
  }

}
