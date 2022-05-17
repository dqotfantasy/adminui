import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {ApiService} from '../../_services/api.service';
import {FormService} from '../../_services/form.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DataService} from '../../_services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  base = 'contests';
  data;
  contestId;
  userTeams = [];
  teamData: any;
  @ViewChild('teamViewTemplate') teamViewTemplate: TemplateRef<HTMLElement>;
  total = 0;
  page = 0;
  perPage = 0;

  constructor(private api: ApiService,
              private formService: FormService,
              private activatedRoute: ActivatedRoute,
              private matDialog: MatDialog,
              public dataService: DataService) {
    this.activatedRoute.paramMap.subscribe(value => {
      if (value.get('contestId')) {
        this.contestId = value.get('contestId');
        this.init().then();
        this.getUserTeams().then();
      }
    });
  }

  async init() {
    const params = new HttpParams();
    const value: any = await this.api.get(this.base + '/' + this.contestId, {params}).toPromise();
    if (value.status) {
      this.data = value.data.contest;
    }
  }

  async getUserTeams() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('contest_id', this.contestId);
    const value: any = await this.api.get(this.base + '/user_teams', {params}).toPromise();
    if (value.status) {
      const data = value.data;
      this.userTeams = data.data;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
    }
  }

  async viewTeam($event: MouseEvent, d: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.teamData = d;
    await this.matDialog.open(this.teamViewTemplate, {panelClass: 'selection-dialog', minWidth: '520px'});
  }
}
