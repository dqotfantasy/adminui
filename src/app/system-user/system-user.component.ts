import { Component,Input, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import {FormlyFieldConfig} from '@ngx-formly/core';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrls: ['./system-user.component.scss']
})
export class SystemUserComponent{
  base='system-user-detail';
  data=[];
  fields: FormlyFieldConfig[];
  page = 0;
  total = 0;
  perPage = 0;
  filter: any = {};
  search ='';


  @Input('fixtureId') fixtureId = '';
  constructor(private api: ApiService,private formService: FormService,public dataService: DataService,private activatedRoute: ActivatedRoute,private router: Router) {

      this.activatedRoute.paramMap.subscribe(value => {
        if(value.get('fixtureId')) {
          this.fixtureId = value.get('fixtureId');
          this.search = value.has('search') ? value.get('search') : '';
          this.page = value.has('page') ? parseInt(value.get('page')) : 0;

          this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;

          this.init().then();
        }
      });
      this.dataService.setTitle('System User');
     }


  async init() {
    let params = new HttpParams();
    for (const f in this.filter) {
      if (this.filter.hasOwnProperty(f)) {
          params = params.set(f, this.filter[f]);
      }
    }
    params = params.set('page', (this.page + 1).toString());
    console.log(this.perPage);
    params = params.set('per_page', this.perPage.toString());
     params = params.set('fixtureId', this.fixtureId);
    params = params.set('search', this.search.toString());
    const value = await this.api.get(this.base, { params }).toPromise();
    this.data = value.data.user_data.data;
    this.total = value.data.user_data.total;
    this.perPage = value.data.user_data.per_page;
    this.page = value.data.user_data.current_page - 1;
  }

  // async setParams() {
  //   if(this.perPage== undefined){
  //     this.perPage=0;
  //   }
  //   const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
  //   await this.router.navigate(['/system-user/'+this.fixtureId+"/"], { queryParams: params });
  //   await this.init();
  // }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'inning_number',
        type: 'select-search',
        templateOptions: {
          label: 'Inning',
          options: [
            { id: '0', name: 'First Inning' },
            { id: '2', name: 'Second Inning' },
            { id: '3', name: 'Third Inning' },
            { id: '4', name: 'Fourth Inning'}
          ],
          required:true
        },
      },
      {
        key: 'entry_fee',
        type: 'input',
        templateOptions: {
          label: 'Entry Fees',
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

}
