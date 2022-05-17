import { Component,Input, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormService } from '../_services/form.service';
import { DataService } from '../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user-team',
  templateUrl: './edit-user-team.component.html',
  styleUrls: ['./edit-user-team.component.scss']
})
export class EditUserTeamComponent implements OnInit {

  base='system-user-detail/edit_team';
  data=[];
  wkdata=[];
  batdata=[];
  ardata=[];
  bowldata=[];
  page = 0;
  total = 0;
  perPage = 0;
  filter: any = {};
  search ='';
  tab;
  type=['WK','BAT','AR','BOWL'];


  @Input('fixtureId') fixtureId = '';
  @Input('userId') userId = '';
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.paramMap.subscribe(value => {
        if(value.get('fixtureId') && value.get('userId')) {
          this.fixtureId = value.get('fixtureId');
          this.userId = value.get('userId');
          this.init().then();
          this.batData().then();
          this.arData().then();
          this.bowlData().then();
          this.dataService.setTitle('Edit Team User');
        }
      });
     }

  ngOnInit(): void {
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('userId', this.userId);
    params = params.set('search', "WK");
    const value = await this.api.get(this.base, { params }).toPromise();
    this.wkdata = value;
  }

  async batData() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('userId', this.userId);
    params = params.set('search', "BAT");
    const value = await this.api.get(this.base, { params }).toPromise();
    this.batdata = value;
  }

  async arData() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('userId', this.userId);
    params = params.set('search', "AR");
    const value = await this.api.get(this.base, { params }).toPromise();
    this.ardata = value;
  }

  async bowlData() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('userId', this.userId);
    params = params.set('search', "BOWL");
    const value = await this.api.get(this.base, { params }).toPromise();
    this.bowldata = value;
  }

  editTeamDataSubmit($value){
    console.log("fineeee"+$value);
  }
}
