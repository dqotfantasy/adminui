import { Component, Input } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment/moment';
import {ToastService} from '../_component/toast/toast.service';


@Component({
  selector: 'app-join-user',
  templateUrl: './join-user.component.html',
  styleUrls: ['./join-user.component.scss']
})
export class JoinUserComponent {

  base = 'join-match-user';
  data = [];
  contestCategories=[];
  search = '';
  total = 0;
  page = 0;
  perPage = 0;
  filter: any = {};
  @Input('fixtureId') fixtureId = '';


  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.paramMap.subscribe(value => {
        if(value.get('fixtureId')) {
          this.fixtureId = value.get('fixtureId');
          this.search = value.has('search') ? value.get('search') : '';
          this.init().then();
          this.dataService.setTitle('Fixtures');
        }
      });
    // this.init().then();
    // this.dataService.setTitle('SubAdmin Data');
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
    params = params.set('fixtureId', this.fixtureId);
    //params = params.set('user_type', this.user_type);
    params = params.set('search', this.search.toString());

    const value = await this.api.get(this.base,{ params }).toPromise();
    if (value.status) {
      const getdata = value.data;
      this.data=getdata.user_data;
      this.contestCategories=getdata.contestCategories;
      this.total = getdata.total;
      this.perPage = getdata.per_page;
      this.page = getdata.current_page - 1;

    }

  }

  // async setParams() {
  //   const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
  //   await this.router.navigate(['/app-join-user'], { queryParams: params });
  // }

  async add() {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'system_user',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Name',
                required: true
              }
            },
            {
              key: 'name',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Name',
                required: true
              }
            },
          ]
        },
      ];


    const value: any = await this.formService.show(fields, this.base, 'POST', {}, {
      title: 'Add System User',
      width: '500px'
    });

    if (value) {
      await this.init();
    }
  }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'user_type',
        type: 'select-search',
        templateOptions: {
          label: 'User type',
          options: [
            { id: '0', name: 'Normal User' },
            { id: '1', name: 'System User' }
          ]
        }
      },
      {
        key: 'contes_categorie',
        type: 'select-search',
        templateOptions: {
          label: 'Contes Categorie',
          options: this.contestCategories
        }
      }
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
        fixture_id: this.fixtureId,
        status: ''
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
        key: 'user_type',
        type: 'select-search',
        templateOptions: {
          label: 'User type',
          options: [
            { id: '0', name: 'Normal User' },
            { id: '1', name: 'System User' }
          ]
        }
      },
      {
        key: 'contes_categorie',
        type: 'select-search',
        templateOptions: {
          label: 'Contes Categorie',
          options: this.contestCategories
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
      params = params.set("fixture_id",this.fixtureId);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('responseType', 'arrayBuffer');

      const value = await this.api.get('export-user-join', {params, responseType: 'blob'}).toPromise();

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
      a.download = 'user_join_fixture.xlsx';
    } else {
      a.download = 'user_join_fixture.csv';
    }
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}
