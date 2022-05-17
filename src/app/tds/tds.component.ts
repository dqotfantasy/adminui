import {Component} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {HttpParams} from '@angular/common/http';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-tds',
  templateUrl: './tds.component.html',
  styleUrls: ['./tds.component.scss']
})
export class TdsComponent {

  base = 'tds';
  data = [];
  total = 0;
  page = 0;
  search = '';
  perPage = 0;
  maxLimit = 0;

  constructor(private api: ApiService,
              private formService: FormService,
              public dataService: DataService) {
    this.dataService.setTitle('TDS');
    this.init().then();
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    const value: any = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      this.data = value.data.data;
      this.total = value.data.total;
      this.perPage = value.data.per_page;
      this.page = value.data.current_page - 1;
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'is_settled',
              type: 'toggle',
              className: 'col-12',
              templateOptions: {
                label: 'Is Settled?',
                required: true,
                appearance: 'none'
              }
            },
            {
              key: 'note',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Note',
              }
            },

          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit TDS',
      width: '350px'
    });

    if (value) {
      await this.init();
    }
  }

}
