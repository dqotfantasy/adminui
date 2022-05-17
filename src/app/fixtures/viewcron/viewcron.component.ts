import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { FormService } from '../../_services/form.service';
import { DataService } from '../../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewcron',
  templateUrl: './viewcron.component.html',
  styleUrls: ['./viewcron.component.scss']
})
export class ViewcronComponent implements OnInit {
  base = 'checkqueue';
  template = 'contest-templates';
  availableData = [];
  popup=false;
  failedData = [];
  competition_id='';
  redisData=[];
  token='';
  ermsg='';
  search = '';
  availabletotal = 0;
  mydate=Date.now();
  failedtotal = 0;

  page = 0;
  availablepage = 0;
  failedpage = 0;
  availableperPage=0;
  failedperPage=0;
  upcpage = 0;
  comppage = 0;

  @Input('fixtureId') fixtureId = '';
  fixtureName = '';
  perPage = 0;
  liveperPage = 0;
  upcperPage = 0;
  compperPage = 0;

  crontype=[
    {name:'Point',id:'point'},
    {name:'Lineup',id:'lineup'},
    {name:'Score',id:'score'},
    {name:'Contest Cancel',id:'contest_cancel'},
    {name:'Calculate Dynamic Price Breakup',id:'dynamic_price'}
  ];

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

      this.activatedRoute.paramMap.subscribe(value => {
        if(value.get('fixtureId')) {
          this.fixtureId = value.get('fixtureId');
          this.init().then();
          this.getToken().then();
          this.failedJobs().then();
        }else {
          this.router.navigateByUrl('/dashboard').then();
        }
      });




    this.dataService.setTitle('View Cron');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value = await this.api.get(this.base + '/' + this.fixtureId, { params }).toPromise();
    // if (value.status) {
      this.availableData = value.data.jobData.data;
      this.fixtureName = value.data.fixture_data.name;
      this.competition_id=value.data.fixture_data.competition_id;
      this.availabletotal = value.data.jobData.total;
      this.availableperPage = value.data.jobData.per_page;
      this.availablepage = value.data.jobData.current_page - 1;
    // }
  }

  async failedJobs() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());

    params = params.set('status', 'failed');
    const value = await this.api.get(this.base + '/' + this.fixtureId, { params }).toPromise();
    // if (value.status) {
      this.failedData = value.data.jobData.data;
      this.failedtotal = value.data.jobData.total;
      this.redisData =  Object.entries(JSON.parse(value.data.redisData));
      this.failedperPage = value.data.jobData.per_page;
      this.failedpage = value.data.jobData.current_page - 1;

    // }
  }

  dateconvert(date){

    let momentVariable = moment(date, 'MM-DD-YYYY');
    let stringvalue = momentVariable.format('YYYY-MM-DD');
    return date;
  }

  ngOnInit(): void {
  }

  async errorShow(data) {
    this.popup = true;
    this.ermsg=data;

  }

  async cronCheck() {
    const fields: FormlyFieldConfig[] = [
            {
              key: 'queue_name',
              type: 'select-search',
              templateOptions: {
                label: 'Cron Name',
                options: this.crontype,
                required: true

              }
            },
            {
              key: 'auto_set',
              type: 'select-search',
              defaultValue: 'false',
              templateOptions: {
                label: 'Auto Set',
                options: [
                  { id: 'true', name: 'True' },
                  { id: 'false', name: 'False' },
                ],
                required: true
              }
            },
            {
              hideExpression: (model) => model.auto_set !== 'true',
              key: 'time_duration',
              type: 'input',
              templateOptions: {
                label: 'Time Duration',
                required: true,
                type: 'number',
                min :1
              }
            },
      ];

    const value: any = await this.formService.show(fields, 'checkqueue/'+this.fixtureId, 'POST', Object.assign({}, ''), {
      title: 'Cron Schedule',
      width: '350px'
    });

    if (value) {
      await this.init();
      this.failedJobs().then();
    }
  }

  async remove(d,flag) {

    const value: any = await this.formService.confirm();

    if (value) {
      let params = new HttpParams();
      params = params.set('status', 'remove');
      params = params.set('flag', flag);
      const v: any = await this.api.get(this.base + '/' + d.id,{ params }).toPromise();
      if (v.status) {
        await this.init();
        this.failedJobs().then();
      }
    }
  }

  async getToken(){
    const value = await this.api.get('get?type=entity_sport').toPromise();
    if (value.status) {
      this.token = value.data.token;
    }
  }

  //  createUrl(url){
  //    console.log("7777777777777777777");
  //    console.log(Date.now());
  //    console.log(url)
  //   let finalurl='https://rest.entitysport.com/v2/' + url+'?token=a050f9a3cbf51783280a08debe3f9431'
  //   return finalurl;
  // }

}
