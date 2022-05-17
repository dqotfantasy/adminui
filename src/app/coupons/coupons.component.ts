import {Component, OnInit} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {HttpParams} from '@angular/common/http';
import {FormlyFieldConfig} from '@ngx-formly/core';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent {

  base = 'coupons';
  data = [];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;

  constructor(private api: ApiService,
              private formService: FormService,
              public dataService: DataService) {
    this.init().then();
    this.dataService.setTitle('Coupons');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      const data = value.data;
      this.data = data.data;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
    }
  }

  async add() {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'code',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Code',
                required: true
              }
            },
            {
              key: 'min_amount',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Min Amount',
                required: true,
                type: 'number',
                min: 0
              }
            },
            {
              key: 'max_cashback',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Max Cashback',
                required: true,
                type: 'number',
                min: 0
              }
            },
            {
              key: 'cashback_percentage',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Cashback Percentage',
                required: true,
                type: 'number',
                min: 0,
                max: 100
              }
            },
            {
              key: 'usage_limit',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Usage Limit',
                required: true,
                type: 'number',
                description: '0 for unlimited',
                min: 0,
              }
            },
            {
              key: 'limit_per_user',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Limit per user',
                required: true,
                type: 'number',
                min: 0,
              }
            },
            {
              key: 'expire_at',
              type: 'datepicker',
              className: 'col-12',
              templateOptions: {
                label: 'Expiry Date',
                datepickerOptions: {
                  min: moment().format('YYYY-MM-DD')
                },
              },
              expressionProperties: {
                'templateOptions.disabled': (model: any) => {
                  return model.usage_limit === 0;
                },
                'templateOptions.required': (model: any) => {
                  return model.usage_limit > 0;
                },
              }
            },
            {
              key: 'wallet_type',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Wallet Type',
                required: true,
                options: [
                  {
                    id: 'MAIN',
                    name: 'MAIN',
                  },
                  {
                    id: 'BONUS',
                    name: 'BONUS',
                  }
                ]
              }
            },
            {
              key: 'is_active',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Is Active?',
                required: true,
                options: [
                  {
                    id: true,
                    name: 'Yes',
                  },
                  {
                    id: false,
                    name: 'No',
                  }
                ]
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Create Coupon',
      width: '350px'
    });

    if (value) {
      await this.init();
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'code',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Code',
                required: true
              }
            },
            {
              key: 'min_amount',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Min Amount',
                required: true,
                type: 'number',
                min: 0
              }
            },
            {
              key: 'max_cashback',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Max Cashback',
                required: true,
                type: 'number',
                min: 0
              }
            },
            {
              key: 'cashback_percentage',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Cashback Percentage',
                required: true,
                type: 'number',
                min: 0,
                max: 100
              }
            },
            {
              key: 'usage_limit',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Usage Limit',
                required: true,
                type: 'number',
                min: 0,
              }
            },
            {
              key: 'limit_per_user',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Limit per user',
                required: true,
                type: 'number',
                min: 0,
              }
            },
            {
              key: 'expire_at',
              type: 'datepicker',
              className: 'col-12',
              templateOptions: {
                label: 'Expiry Date',
                datepickerOptions: {
                  min: moment(d.expire_at).format('YYYY-MM-DD')
                },
              },
              expressionProperties: {
                'templateOptions.disabled': (model: any) => {
                  return model.usage_limit === 0;
                },
                'templateOptions.required': (model: any) => {
                  return model.usage_limit > 0;
                },
              }
            },
            {
              key: 'wallet_type',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Wallet Type',
                required: true,
                options: [
                  {
                    id: 'MAIN',
                    name: 'MAIN',
                  },
                  {
                    id: 'BONUS',
                    name: 'BONUS',
                  }
                ]
              }
            },
            {
              key: 'is_active',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Is Active?',
                required: true,
                options: [
                  {
                    id: true,
                    name: 'Yes',
                  },
                  {
                    id: false,
                    name: 'No',
                  }
                ]
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Coupon',
      width: '350px'
    });

    if (value) {
      await this.init();
    }
  }

  async remove(d) {
    const value = await this.formService.confirm();

    if (value) {
      const v: any = await this.api.delete(this.base + '/' + d.id).toPromise();
      if (v.status) {
        await this.init();
      }
    }
  }

}
