import {Component} from '@angular/core';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ApiService} from '../_services/api.service';
import {FormService} from '../_services/form.service';
import {DataService} from '../_services/data.service';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent {
  fields: FormlyFieldConfig[] = [];
  base = 'competitions';
  data = [];
  total = 0;
  page = 0;
  search = '';
  perPage = 0;
  tenants: any;
  competitions = [];
  statuses = [];
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

    this.dataService.setTitle('Competitions');
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
      this.data = value.data.competitios.data;
      this.total = value.data.competitios.total;
      this.statuses = value.data.statuses;
      this.perPage = value.data.competitios.per_page;
      this.page = value.data.competitios.current_page - 1;
    }

    this.fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [{
          key: 'prize_breakup',
          type: 'repeat',
          className: 'col-12',
          templateOptions: {
            addText: 'Add Rank'
          },
          fieldArray: {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'from',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'From',
                  required: true,
                  type: 'number',
                  min: 1
                }
              },
              {
                key: 'to',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'To',
                  required: true,
                  type: 'number',
                  min: 1
                }
              },

              {
                key: 'prize',
                type: 'input',
                className: 'col-12 col-md-2',
                templateOptions: {
                  label: 'Prize',
                  type: 'number',
                }

              },
              {
                key: 'photo',
                type: 'input',
                className: 'col-2',
                templateOptions: {
                  label: 'Save Image',
                  readonly:true
                }
              },
              {
                key: 'photo',
                type: 'file',
                className: 'col-12 col-md-3',
                templateOptions: {
                  label: 'Image',
                  floatLabel: 'always'
                }
              },
            ]
          }
        }]
      },
    ];

  }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [

      {
        key: 'status',
        type: 'select-search',
        templateOptions: {
          label: 'Status',
          options: this.statuses
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
          await this.setParams();
      }
    }
  }


  async setParams() {
    const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
    await this.router.navigate(['/competitions'], { queryParams: params });
  }


  async edit(d) {
    if(d.prize_breakup==null){
      d.prize_breakup=[{"from":"","to":"","prize":""}];
    }
    const value: any = await this.formService.show(this.fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Prize Breakup',
      minWidth: '50vw',
      maxWidth: '90vw'
    });

    if (value) {
      await this.init();
    }
  }

  async update(d) {
    d.leaderboard_text="leaderboard update";
    await this.api.put(this.base + '/' + d.id, d).toPromise();
  }


}

