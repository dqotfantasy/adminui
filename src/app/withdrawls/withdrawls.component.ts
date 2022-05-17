import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {HttpParams} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormlyFieldConfig} from '@ngx-formly/core';
import * as moment from 'moment/moment';
import {ToastService} from '../_component/toast/toast.service';
import {DomSanitizer} from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs';

@Component({
  selector: 'app-withdrawls',
  templateUrl: './withdrawls.component.html',
  styleUrls: ['./withdrawls.component.scss']
})
export class WithdrawlsComponent {

  base = 'payments';
  data = [];
  filter: any = {};
  total = 0;
  page = 0;
  perPage = 0;
  search = '';
  status ='';
  @Input('userId') userId = '';
  @ViewChild('exportTemplate') exportTemplate: TemplateRef<HTMLElement>;
  fileUrl: any;

  constructor(private api: ApiService,
              private formService: FormService,
              public dataService: DataService,
              private matDialog: MatDialog,
              private sanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private toastService: ToastService) {

                this.activatedRoute.queryParamMap.subscribe(value => {
                  // this.filter = {
                  //   from_date: '',
                  //   to_date: '',
                  //   type: ''
                  // };

                  this.filter = {
                    status: 'PENDING'
                  };

                  this.search = value.has('search') ? value.get('search') : '';
                  this.status = value.has('status') ? value.get('status') : '';


                  // tslint:disable-next-line:radix
                  this.page = value.has('page') ? parseInt(value.get('page')) : 0;
                  // tslint:disable-next-line:radix
                  this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;

                  this.init().then();
                });

    this.dataService.setTitle('Payments');
  }

  // ngOnInit() {
  //   this.init().then();
  // }

  async init() {
    let params = new HttpParams();
    params = params.set('status', this.status.toString());

    if (this.filter) {
      for (const f in this.filter) {
        if (this.filter.hasOwnProperty(f)) {
          params = params.set(f, this.filter[f]);
        }
      }
    }
    params = params.set('type', 'WITHDRAW');
    params = params.set('mode', 'WITHDRAW');
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    params = params.set('user_id', this.userId.toString());
    const value: any = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      const data = value.data;
      this.data = data.payments;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
    }
  }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      // {
      //   key: 'type',
      //   type: 'select-search',
      //   templateOptions: {
      //     label: 'Type',
      //     options: [
      //       { id: 'DEPOSIT', name: 'DEPOSIT' },
      //       { id: 'WITHDRAW', name: 'WITHDRAW' },
      //       { id: 'CONTEST JOIN', name: 'CONTEST JOIN' },
      //       { id: 'CONTEST WON', name: 'CONTEST WON' },
      //       { id: 'REFUND', name: 'REFUND' },
      //     ]
      //   }
      // },
      {
        key: 'status',
        type: 'select-search',
        templateOptions: {
          label: 'Status',
          options: [
            {id: 'SUCCESS', name: 'SUCCESS'},
            {id: 'PENDING', name: 'PENDING'},
            {id: 'REJECTED', name: 'REJECTED'}
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
            {value: 'CSV', label: 'CSV'},
            {value: 'XLS', label: 'XLS'}
          ],
          required: true,
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
      }

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('responseType', 'arrayBuffer');

      const value = await this.api.get('export-payment', {params, responseType: 'blob'}).toPromise();

      let type = 'application/vba.ms-excel';
      if (this.filter.type === 'CSV') {
        type = 'application/csv';
      }
      this.downLoadFile(value, type);
    }
  }

  downLoadFile(data: any, type: string) {
    const blob = new Blob([data], {type});
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

  // async changeStatus(d) {

  //   const fields: FormlyFieldConfig[] = [
  //     {
  //       fieldGroupClassName: 'row',
  //       fieldGroup: [
  //         {
  //           key: 'status',
  //           type: 'select-search',
  //           className: 'col-12',
  //           templateOptions: {
  //             label: 'Status',
  //             required: true,
  //             options: [
  //               {id: 'PENDING', name: 'PENDING'},
  //               {id: 'SUCCESS', name: 'SUCCESS'},
  //             ]
  //           }
  //         },
  //       ]
  //     },
  //   ];

  //   const data: any = {
  //     status: d.status
  //   };

  //   if (data.status) {
  //     const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, data), {
  //       title: 'Payment Update',
  //       minWidth: '350px'
  //     });

  //     if (value) {
  //       await this.init();
  //     }
  //   }
  // }
  async changeStatus(d,msg){
    let text="Are you sure you want to send withdraw payment?";
    if(msg=='cancel'){
      text="Are you sure you want to cancel withdraw payment?"
    }
    const cvalue: any = await this.formService.confirm("Confirmation",text);
    if (cvalue) {
      d.status=msg;
      const value: any =await this.api.put(this.base + '/' + d.id, d).toPromise();
      if (value.status) {
        await this.init();
      }
    }
  }

}
