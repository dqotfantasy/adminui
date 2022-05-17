import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment/moment';
import { ToastService } from '../_component/toast/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  base = 'payments';
  data = [];
  statuses = [];
  filter: any = {};
  total = 0;
  page = 0;
  perPage = 0;
  search = '';
  @Input('userId') userId = '';
  @ViewChild('exportTemplate') exportTemplate: TemplateRef<HTMLElement>;
  fileUrl: any;
  status='';
  type='';
  to_date='';
  flag='';

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private matDialog: MatDialog,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService) {
    this.filter = {
      from_date: '',
      to_date: '',
      type: ''
    };
    this.activatedRoute.queryParamMap.subscribe(value => {

      this.status = value.has('status') ? value.get('status') : '';
      this.type = value.has('type') ? value.get('type') : '';
      this.flag = value.has('date') ? value.get('date') : '';
      this.to_date = value.has('to_date') ? value.get('to_date') : '';
      this.filter = {
        status: this.status,
        type: this.type,
        flag: this.flag,
      };
      this.init().then();
    });

    this.dataService.setTitle('Payments');
  }

  ngOnInit() {
    this.init().then();
  }

  convert(data){
    if(data){
      let converData=JSON.parse(data);
      return converData;
    }else{
      return 0;
    }
  }

  async init() {
    let params = new HttpParams();
    if (this.filter) {
      for (const f in this.filter) {
        if (this.filter.hasOwnProperty(f)) {
          params = params.set(f, this.filter[f]);
        }
      }
    }
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    params = params.set('user_id', this.userId.toString());
    const value: any = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      const data = value.data;
      this.statuses = value.data.statuses;
      this.data = data.payments;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
    }
  }
  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'type',
        type: 'select-search',
        templateOptions: {
          label: 'Type',
          options: this.statuses
        }
      },
      {
        key: 'status',
        type: 'select-search',
        templateOptions: {
          label: 'Status',
          options: [
            { id: 'SUCCESS', name: 'SUCCESS' },
            { id: 'PENDING', name: 'PENDING' }
          ]
        }
      }
    ];
    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
        fixture_id: '',
        merchant_id: ''
      }
    });

    if (newValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(this.filter)) {
        this.filter = newValue;
        console.log(JSON.stringify(this.filter)+"000000000000000000000");
        await this.init();
      }
    }
  }

  async exportData() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'from_date',
        type: 'datepicker',
        templateOptions: {
          label: 'From',
          type: 'date',
          datepickerOptions: {
            max: moment().format('YYYY-MM-DD')
          },
          required: true,
        },
        expressionProperties: {
          'templateOptions.datepickerOptions.max': 'model.to_date'
        }
      },
      {
        key: 'to_date',
        type: 'datepicker',
        templateOptions: {
          label: 'To',
          type: 'date',
          datepickerOptions: {
            max: moment().format('YYYY-MM-DD')
          },
          required: true,
        },
        expressionProperties: {
          'templateOptions.datepickerOptions.min': 'model.from_date',
        }
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type',
          options: [
            { value: 'CSV', label: 'CSV' },
            { value: 'XLS', label: 'XLS' }
          ],
          required: true,
        }
      },
      {
        key: 'typecontest',
        type: 'select-search',
        templateOptions: {
          label: 'Type',
          options: [
            { id: 'DEPOSIT', name: 'DEPOSIT' },
            { id: 'WITHDRAW', name: 'WITHDRAW' },
            { id: 'CONTEST JOIN', name: 'CONTEST JOIN' },
            { id: 'CONTEST WON', name: 'CONTEST WON' },
            { id: 'REFUND', name: 'REFUND' },
            { id: 'Admin ADDED', name: 'Admin ADDED' },
            { id: 'ADMIN DEDUCT', name: 'ADMIN DEDUCT' },
          ]
        }
      },
      {
        key: 'status',
        type: 'select-search',
        templateOptions: {
          label: 'Status',
          options: [
            { id: 'SUCCESS', name: 'SUCCESS' },
            { id: 'PENDING', name: 'PENDING' }
          ]
        }
      },
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
        from_date: '',
        to_date: '',
        type: '',
      }
    });

    if (newValue) {

      this.filter = newValue;
      let params = new HttpParams();
      for (const f in this.filter) {
        if (this.filter.hasOwnProperty(f)) {
          if (['from_date', 'to_date'].indexOf(f) > -1) {
            const date = moment(this.filter[f]);
            if (date.isValid()) {
              params = params.set(f, date.format('YYYY-MM-DD'));
            } else {
              await this.toastService.error('Invalid Filter Selection');
            }
          } else {
            params = params.set(f, this.filter[f]);
          }
        }
        params = params.set('user_id', this.userId.toString());
      }

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('responseType', 'arrayBuffer');

      const value = await this.api.get('export-payment', { params, responseType: 'blob' }).toPromise();
      //console.log(value);
      let type = 'application/vba.ms-excel';
      if (this.filter.type === 'CSV') {
        type = 'application/csv';
      }
      this.downLoadFile(value, type);
    }
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    if (type === 'application/vba.ms-excel') {
      a.download = 'payment.xlsx';
    } else {
      a.download = 'payment.csv';
    }
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  async changeStatus(d) {

    const fields: FormlyFieldConfig[] = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'status',
            type: 'select-search',
            className: 'col-12',
            templateOptions: {
              label: 'Status',
              required: true,
              options: [
                { id: 'PENDING', name: 'PENDING' },
                { id: 'SUCCESS', name: 'SUCCESS' },
              ]
            }
          },
        ]
      },
    ];

    const data: any = {
      status: d.status
    };

    if (data.status) {
      const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, data), {
        title: 'Payment Update',
        minWidth: '350px'
      });

      if (value) {
        await this.init();
      }
    }
  }

}
