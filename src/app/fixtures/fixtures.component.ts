import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {
  base = 'fixtures';
  template = 'contest-templates';
  data = [];
  contdata = [];
  livedata = [];
  upcdata = [];
  compdata = [];
  statuses = [];
  competitionStatus = [];
  competitionsearch = '';
  search = '';
  total = 0;
  conttotal = 0;
  livetotal = 0;
  upctotal = 0;
  comptotal = 0;
  page = 0;
  livepage = 0;
  upcpage = 0;
  comppage = 0;
  crontype=[
    {name:'Point',id:'point'},
    {name:'Lineup',id:'lineup'},
    {name:'Score',id:'score'}
  ];
  tab;
  @Input('userId') userId = '';

  @ViewChild('exportTemplate') exportTemplate: TemplateRef<HTMLElement>; live
  perPage = 0;
  liveperPage = 0;
  upcperPage = 0;
  compperPage = 0;
  filter: any = {
    from_date: '',
    to_date: '',
    status: '',
    competitionStatus: ''
  };
  types = ['NOT STARTED', 'LIVE', 'IN REVIEW', 'COMPLETED', 'CANCELED'];



  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.activatedRoute.queryParamMap.subscribe(value => {
      this.filter = {
        from_date: value.has('from_date') ?
          moment(value.get('from_date')).format('YYYY-MM-DD') :
          moment().add(-1, 'day').format('YYYY-MM-DD'),
        to_date: value.has('to_date') ?
          moment(value.get('to_date')).format('YYYY-MM-DD') : moment().add(10, 'day').format('YYYY-MM-DD'),
        status: value.get('status') ?? '',
        competitionStatus: value.get('competitionStatus') ?? ''
      };
      this.search = value.has('search') ? value.get('search') : '';
      this.competitionsearch = value.has('competitionStatus') ? value.get('competitionStatus') : '';
      this.page = value.has('page') ? parseInt(value.get('page')) : 0;
      if(value.get('userId')) {
        this.userId = value.get('userId');
      }
      //this.userId = value.has('user_id') ? value.get('user_id') : '';

      this.perPage = value.has('perPage') ? parseInt(value.get('perPage')) : 0;
      this.ngOnInit();
      // this.conttemplate().then();
      // this.getLiveData().then();
      // this.getUpcomData().then();
      // this.getCompData().then();
    });
    this.dataService.setTitle('Fixtures');
  }

  ngOnInit() {
    this.conttemplate().then();
    this.getLiveData().then();
    this.getUpcomData().then();
    this.getCompData().then();
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
    params = params.set('user_id', this.userId.toString());

    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      this.data = value.data.fixtures.data;
      this.statuses = value.data.statuses;
      this.competitionStatus = value.data.competitionStatus;
      this.tab = this.types[0];
      this.total = value.data.fixtures.total;
      this.perPage = value.data.fixtures.per_page;
      this.page = value.data.fixtures.current_page - 1;
    }
  }

  async getLiveData() {
    let params = new HttpParams();
    params = params.set('competitionStatus', this.competitionsearch.toString());
    params = params.set('page', (this.page + 1).toString());
    if(this.userId==''){
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
          this.page=0;
        }
      }
    }
    params = params.set('per_page', this.perPage.toString());
    params = params.set('default_status', "LIVE,IN REVIEW");
    params = params.set('search', this.search.toString());
    params = params.set('user_id', this.userId.toString());

    const value = await this.api.get(this.base, { params }).toPromise();

    if (value.status) {
      this.livedata = value.data.fixtures.data;
      this.statuses = value.data.statuses;
      this.competitionStatus = value.data.competitionStatus;
      this.tab = this.types[0];
      this.livetotal = value.data.fixtures.total;
      this.liveperPage = value.data.fixtures.per_page;
      this.livepage = value.data.fixtures.current_page - 1;
    }
  }

  async getUpcomData() {
    let params = new HttpParams();
    params = params.set('competitionStatus', this.competitionsearch.toString());
    if(this.userId==''){
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
    }
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('status', "NOT STARTED");
    params = params.set('search', this.search.toString());
    params = params.set('user_id', this.userId.toString());

    const value = await this.api.get(this.base, { params }).toPromise();

    if (value.status) {
      this.upcdata = value.data.fixtures.data;
      this.statuses = value.data.statuses;
      this.competitionStatus = value.data.competitionStatus;
      this.tab = this.types[0];
      this.upctotal = value.data.fixtures.total;
      this.upcperPage = value.data.fixtures.per_page;
      this.upcpage = value.data.fixtures.current_page - 1;
    }
  }

  async getCompData() {
    let params = new HttpParams();
    params = params.set('competitionStatus', this.competitionsearch.toString());

    if(this.userId==''){
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
    }
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('default_status', "COMPLETED,CANCELED");
    //params = params.set('default_status', "Live,IN REVIEW");

    params = params.set('search', this.search.toString());
    params = params.set('user_id', this.userId.toString());

    const value = await this.api.get(this.base, { params }).toPromise();

    if (value.status) {
      this.compdata = value.data.fixtures.data;
      this.statuses = value.data.statuses;
      this.competitionStatus = value.data.competitionStatus;
      this.tab = this.types[0];
      this.comptotal = value.data.fixtures.total;
      this.compperPage = value.data.fixtures.per_page;
      this.comppage = value.data.fixtures.current_page - 1;
    }
  }

  async edit(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'teama_image',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: d.teama + ' image',
                floatLabel: 'always'
              }
            },
            {
              key: 'teamb_image',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: d.teamb + ' image',
                floatLabel: 'always'
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Fixture',
      width: '350px'
    });

    if (value) {
      //await this.init();
      await this.getLiveData();
      await this.getUpcomData();
      await this.getCompData();
    }
  }

  async statusChange(d) {
    const fields: FormlyFieldConfig[] =
      [
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
                options: this.statuses,

              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Match Status Change',
      width: '350px'
    });

    if (value) {
      //await this.init();
      await this.getLiveData();
      await this.getUpcomData();
      await this.getCompData();
    }
  }

  async cronCheck(d) {
    const fields: FormlyFieldConfig[] = [
            {
              key: 'queue_name',
              type: 'select-search',
              templateOptions: {
                label: 'Status',
                options: this.crontype
              }
            },
      ];

    const value: any = await this.formService.show(fields, 'checkqueue/'+d.id, 'POST', Object.assign({}, d), {
      title: 'Cron Run',
      width: '350px'
    });

    if (value) {
      //await this.init();
      await this.getLiveData();
      await this.getUpcomData();
      await this.getCompData();
    }
  }

  async editdate(data) {
    // data['allow_prize_distribution']=!data['allow_prize_distribution'];
    // data['cancel_allow']=!data['cancel_allow'];
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {

              key: 'starting_at',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Change Date',
                required: true
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, this.base + '/' + data.id, 'PUT', Object.assign({}, data), {
      title: 'Edit Starting Date',
      width: '350px'
    });

    // const value: any = await this.formService.show(fields,'fixture_date_update' , 'POST',Object.assign({}, data), {
    //   title: 'Edit Starting Date',
    //   width: '350px'
    // });

    if (value) {

      await this.getLiveData();
      await this.getUpcomData();
      await this.getCompData();
    }
  }

  async update(d) {
    d['allow_prize_distribution']=!d['allow_prize_distribution'];
    d['cancel_allow']=!d['cancel_allow'];
    await this.api.put(this.base + '/' + d.id, d).toPromise();
    await this.getLiveData();
    await this.getUpcomData();
    await this.getCompData();
  }

  async updateDistribute(d) {
    d['cancel_allow']=!d['cancel_allow'];
    await this.api.put(this.base + '/' + d.id, d).toPromise();
    await this.getLiveData();
    await this.getUpcomData();
    await this.getCompData();
  }

  async updateCancel(d) {
    d['allow_prize_distribution']=!d['allow_prize_distribution'];
    await this.api.put(this.base + '/' + d.id, d).toPromise();
    await this.getLiveData();
    await this.getUpcomData();
    await this.getCompData();
  }

  async openFilter() {
    const fields: FormlyFieldConfig[] = [
      {
        key: 'competitionStatus',
        type: 'select-search',
        templateOptions: {
          label: 'Competetion Name',
          options: this.competitionStatus,

        }
      },
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
          options: this.statuses

        }
      },
    ];

    const newValue = await this.formService.filter(fields, this.filter, {
      width: '300px', reset: {
        from_date: moment().add(-1, 'day').format('YYYY-MM-DD'),
        to_date: moment().add(10, 'day').format('YYYY-MM-DD'),
        status: '',
        competition_name: ''
      }
    });
    if (newValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(this.filter)) {
        this.filter = newValue;

        if (this.userId == '') {
          //await this.setParams();
          await this.getLiveData();
          await this.getUpcomData();
          await this.getCompData();
        } else {

          await this.getLiveData();
          await this.getUpcomData();
          await this.getCompData();
        }
      }
    }
  }

  // async setParams() {
  //     await this.getLiveData();
  //     await this.getUpcomData();
  //     await this.getCompData();
  // }

  async setParams() {
    const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
    await this.router.navigate(['/fixtures'], { queryParams: params });
  }

  async conttemplate() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('cat_check', "default");
    const value = await this.api.get(this.template, { params }).toPromise();
    if (value.status) {
      this.contdata = value.data.contest_templates;

    }
  }

  async addcontest() {
    var dynamic = [];
    let categKeys = Object.keys(this.contdata)

    let _fiedls = this.contdata

    let _fieldGroup = Object.keys(this.contdata).map((key) => {
      return {

        type: 'checkbox',
        label: key,
        templateOptions: {
          label: key,
        }
      }

    })

    const fields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            key: 'first_inning',
            type: 'checkbox',
            label: 'Full inning',
            templateOptions: {
              label: 'Full inning',
            },
          },
          {
            key: 'second_inning',
            type: 'checkbox',
            className: 'col-12 col-md-3',
            templateOptions: {
              label: 'Second inning',
            },
          },
          {
            key: 'third_inning',
            type: 'checkbox',
            className: 'col-12 col-md-3',
            templateOptions: {
              label: 'Third inning',
            },
          },
          {
            key: 'fourth_inning',
            type: 'checkbox',
            className: 'col-12 col-md-3',
            templateOptions: {
              label: 'Fourth inning',
            },
          },
          ..._fieldGroup
        ],
      },
      {
        fieldGroupClassName: 'row',
        dynamic
      },
    ];

    const value: any = await this.formService.show(fields, this.base, 'POST', {
      title: 'Create Contest',
      minWidth: '50vw',
      maxWidth: '90vw'
    });
  }

}
