import { Component} from '@angular/core';
import {ApiService} from '../../_services/api.service';
import {FormService} from '../../_services/form.service';
import {DataService} from '../../_services/data.service';
import {HttpParams} from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  base = 'userwallet';
  data = [];
  total = 0;
  page = 0;
  search = '';
  perPage = 0;
  adminrole=0;
  tenants: any;
  filter: any = {
    status: ''
  };

  constructor(private api: ApiService, private formService: FormService, public dataService: DataService,private router: Router,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe(value => {
      this.filter = {
        status: value.get('status') ?? ''
      };
      this.search = value.has('search') ? value.get('search') : '';

      // tslint:disable-next-line:radix
      this.page = value.has('page') ? parseInt(value.get('page')) : 0;
      // tslint:disable-next-line:radix
      this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;

      this.init().then();
    });
    this.dataService.setTitle('userwallet');
  }

  async init() {
    let params = new HttpParams();
    for (const f in this.filter) {
      if (this.filter.hasOwnProperty(f)) {
          params = params.set(f, this.filter[f]);
      }
    }
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value: any = await this.api.get(this.base, {params}).toPromise();
    if (value.status) {
      const data = value.data;
      this.data = data.users;
      this.adminrole=data.role_id;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
    }
  }

  async edit(data,type) {

    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: type,
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Default Value',
                required: true,
                readonly:true
              }
            },
            {
              key: 'change_amount',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Enter Value',
                required: true
              }
            },
            {
              key: 'action',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Action',
                required: true,
                options: [
                  { id: 'add', name: 'Add' },
                  { id: 'deduct', name: 'Deduct' },
                ]
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + data.id, 'PUT', Object.assign({}, data), {
      title: 'Edit User Wallet',
      width: '350px'
    });

    if (value) {
      await this.init();
    }
  }

  // async update(d) {
  //   await this.api.put(this.base + '/' + d.id, d).toPromise();
  //   await this.init();
  // }

  async setParams() {
    const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
    await this.router.navigate(['/wallet'], { queryParams: params });
  }
  // ngOnInit(): void {
  // }

}
