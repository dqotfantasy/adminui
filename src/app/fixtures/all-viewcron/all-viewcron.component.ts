import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { FormService } from '../../_services/form.service';
import { DataService } from '../../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment/moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-viewcron',
  templateUrl: './all-viewcron.component.html',
  styleUrls: ['./all-viewcron.component.scss']
})
export class AllViewcronComponent implements OnInit {

  base = 'all-checkqueue';
  template = 'contest-templates';
  availableData = [];
  fixture_data=[];
  popup=false;
  failedData = [];
  competition_id='';
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
          this.init().then();
          //this.getToken().then();
          this.failedJobs().then();
      });




    this.dataService.setTitle('View Cron');
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('search', this.search.toString());
    const value = await this.api.get(this.base, { params }).toPromise();
    // if (value.status) {
      this.availableData = value.data.jobData.data;
      this.fixture_data = value.data.fixture_data;
      //this.competition_id=value.data.fixture_data.competition_id;
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
    const value = await this.api.get(this.base , { params }).toPromise();
    // if (value.status) {
      this.failedData = value.data.jobData.data;
      this.failedtotal = value.data.jobData.total;
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
  async getToken(){
    const value = await this.api.get('get?type=entity_sport').toPromise();
    if (value.status) {
      this.token = value.data.token;
    }
  }

  findArray(data){
    let show='';
    let fixtureIds = this.fixture_data.map((fd)=>{
      if(data.includes(fd.id)){
        show =fd.starting_at+" | "+fd.name;
      }
    })
    // if(show==''){
    //   return data;
    // }
    return show;
    //console.log(show);
  }

  async remove(d) {
    const value: any = await this.formService.confirm();

    if (value) {
      let params = new HttpParams();
      params = params.set('status', 'jobremove');
      params = params.set('jobid', d.id);
      const v: any = await this.api.get(this.base ,{ params }).toPromise();
      if (v.status) {
        await this.init();
        this.failedJobs().then();
      }
    }
  }

  async failremove(d) {
    const value: any = await this.formService.confirm();

    if (value) {
      let params = new HttpParams();
      params = params.set('status', 'failremove');
      params = params.set('failjobid', d.id);
      const v: any = await this.api.get(this.base ,{ params }).toPromise();
      if (v.status) {
        await this.init();
        this.failedJobs().then();
      }
    }
  }

}
