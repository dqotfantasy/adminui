import { Component } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { HttpParams } from '@angular/common/http';
import { DataService } from '../_services/data.service';
import { list } from '../animation';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastService} from '../_component/toast/toast.service';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [list]
})
export class UsersComponent {
  base = 'users';
  notifybase='notifications';
  data = [];
  total = 0;
  page = 0;
  perPage = 0;
  search = '';
  find ='';
  filter: any = {};
  type: any = [];
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

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
      this.find = value.has('find') ? value.get('find') : '';

      // tslint:disable-next-line:radix
      this.page = value.has('page') ? parseInt(value.get('page')) : 0;
      // tslint:disable-next-line:radix
      this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;

      this.init().then();
    });


    this.dataService.setTitle('Users');
    //this.init().then();
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    params = params.set('find', this.find.toString());
    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      const data = value.data;
      this.data = data.users;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
      this.type = value.data.type;
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'name',
              type: 'input',
              className: 'col-12 col-md-6',
              templateOptions: {
                label: 'Name',
                required: true
              }
            },
            {
              key: 'password',
              type: 'input',
              className: 'col-12 col-md-6',
              templateOptions: {
                label: 'Password',
                type: 'password',
                description: 'Enter if you want to change.'
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), { title: 'Edit User' });

    if (value) {
      await this.init();
    }
  }

  async setParams() {
    const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
    await this.router.navigate(['/users'], { queryParams: params });
  }

  async add(d:any) {
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
    const value: any = await this.formService.show(fields, this.notifybase + '/sendAll?user_id=' +d, 'POST', {}, {
      title: 'Send Notification',
      width: '350px'
    });

    if (value) {
      await this.init();
    }
  }

  async exportData() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'user_type',
        type: 'select',
        templateOptions: {
          label: 'User Type',
          options: [
            {value: '0', label: 'Normal'},
            {value: '1', label: 'System User'}
          ],
          required: true,
        }
      },
      {
        key: 'document_verified',
        type: 'select',
        templateOptions: {
          label: 'Document Verified',
          options: [
            {value: '1', label: 'Yes'},
            {value: '0', label: 'No'}
          ],
          //required: true,
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

      const value = await this.api.get('export-user', {params, responseType: 'blob'}).toPromise();

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
      a.download = 'user_data.xlsx';
    } else {
      a.download = 'user_data.csv';
    }
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
