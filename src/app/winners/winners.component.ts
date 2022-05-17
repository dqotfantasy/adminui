import { Component } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrls: ['./winners.component.scss']
})

export class WinnersComponent {
  base = 'fixtures';
  data = [];
  statuses = [];
  types = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  filter: any = {};
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.filter = {
      from_date: moment().add(-1, 'day').format('YYYY-MM-DD'),
      to_date: '',
      status: ''
    };

    this.activatedRoute.queryParamMap.subscribe(value => {
      this.filter = {
        from_date: value.has('from_date') ?
          moment(value.get('from_date')).format('YYYY-MM-DD') :
          moment().add(-1, 'day').format('YYYY-MM-DD'),
        to_date: value.has('to_date') ?
          moment(value.get('to_date')).format('YYYY-MM-DD') : '',
        status: value.get('status') ?? ''
      };
      this.search = value.has('search') ? value.get('search') : '';

      // tslint:disable-next-line:radix
      this.page = value.has('page') ? parseInt(value.get('page')) : 0;
      // tslint:disable-next-line:radix
      this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;

      this.init().then();
    });

  }

  async init() {
    let params = new HttpParams();
    for (const f in this.filter) {
      if (this.filter.hasOwnProperty(f)) {
        if (['from_date', 'to_date'].indexOf(f) > -1) {
          const date = moment(this.filter[f]);
          if (date.isValid()) {
            params = params.set(f, date.format('YYYY-MM-DD'));
          }
        } else {
          params = params.set(f, this.filter[f]);
        }
      }
    }
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value = await this.api.get(this.base + '/winners', { params }).toPromise();
    if (value.status) {
      this.data = value.data.fixtures.data;
      this.total = value.data.fixtures.total;
      this.perPage = value.data.fixtures.per_page;
      this.page = value.data.fixtures.current_page - 1;
    }
  }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'from_date',
        type: 'datepicker',
        templateOptions: {
          label: 'From',
          type: 'date'
        }
      },
      {
        key: 'to_date',
        type: 'datepicker',
        templateOptions: {
          label: 'To',
          type: 'date'
        }
      },
      {
        key: 'status',
        type: 'select-search',
        templateOptions: {
          label: 'Status',
          options: this.statuses,
          // multiple: true
        }
      },
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
        from_date: moment().add(-1, 'day').format('YYYY-MM-DD'),
        to_date: '',
        status: ''
      }
    });
    if (newValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(this.filter)) {
        this.filter = newValue;
        await this.setParams();
      }
    }
  }

  async setParams() {
    const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
    await this.router.navigate(['/winners'], { queryParams: params });
  }
}
