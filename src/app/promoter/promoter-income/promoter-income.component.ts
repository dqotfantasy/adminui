import { Component } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { FormService } from '../../_services/form.service';
import { DataService } from '../../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-promoter-income',
  templateUrl: './promoter-income.component.html',
  styleUrls: ['./promoter-income.component.scss']
})
export class PromoterIncomeComponent {
  base = 'promoter-income-info';
  data = [];
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
      this.activatedRoute.paramMap.subscribe(value => {
          this.search = value.has('search') ? value.get('search') : '';
          this.init().then();
          this.dataService.setTitle('Referal User');
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
    //params = params.set('user_type', this.user_type);
    params = params.set('search', this.search.toString());

    const value = await this.api.get(this.base,{ params }).toPromise();
    if (value.status) {
      const getdata = value.data;
      this.data=getdata.promoter_data;
      this.total = getdata.total;
      this.perPage = getdata.per_page;
      this.page = getdata.current_page - 1;

    }

  }

  convertjs(data){
    let con=JSON.parse(data);
    return con.referal_code;
    //console.log(con+"000000000000000");
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
      }
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
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

}
