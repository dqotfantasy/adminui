import {Component} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {HttpParams} from '@angular/common/http';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {DataService} from '../_services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})

export class NotificationsComponent {
  base = 'notifications';
  data = [];
  total = 0;
  page = 0;
  perPage = 0;
  search = '';
  type: any = [];

  constructor(private api: ApiService, private formService: FormService, public dataService: DataService) {
    this.init().then();
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    const value: any = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      this.type = value.data.type;
      this.data = value.data.notifications.data;
      this.total = value.data.notifications.total;
      this.perPage = value.data.notifications.per_page;
      this.page = value.data.notifications.current_page - 1;
    }
  }

  async add() {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'type',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Type',
                options: this.type
              }
            },
            {
              key: 'day',
              type: 'input',
              className: 'col-12',
              defaultValue: 0,
              templateOptions: {
                label: 'Enter Day',
                type: 'number',
                min: 0
              },
              hideExpression: (model, formState) => model.type !== 'GAMEPLAY',
            },
            {
              key: 'subject',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Subject',
                required: true
              }
            },
            {
              key: 'message',
              type: 'textarea',
              className: 'col-12',
              templateOptions: {
                label: 'Message',
              }
            },
            {
              key: 'image',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Image',
                floatLabel: 'always'
              }
            },
          ]
        },
      ];
    const value: any = await this.formService.show(fields, this.base + '/sendAll', 'POST', {}, {
      title: 'Send Notification',
      width: '350px'
    });

    if (value) {
      await this.init();
    }
  }

}
