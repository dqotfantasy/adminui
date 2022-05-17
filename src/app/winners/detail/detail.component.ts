import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { FormService } from '../../_services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { DataService } from '../../_services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HttpParams } from '@angular/common/http';
import * as moment from 'moment/moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  base = 'fixtures';
  data;
  id;
  selectedPlayer;
  search;
  filter: any;
  contests: any = [];
  prizeBreakups = [];
  userTeamsData = [];
  playerData = [];
  @ViewChild('prizeBreakupTemplate') prizeBreakupTemplate: TemplateRef<HTMLElement>;
  @ViewChild('contestTeams') contestTeams: TemplateRef<HTMLElement>;
  constructor(private api: ApiService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dataService: DataService,
    private matDialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe(value => {
      if (value.get('fixtureId')) {
        this.id = value.get('fixtureId');
        this.init().then();
      } else {
        this.router.navigateByUrl('/dashboard').then();
      }
    });
  }

  async init() {
    const value: any = await this.api.get(this.base + '/' + this.id).toPromise();
    if (value.status) {
      this.data = value.data.fixture;
      this.getContests();
    }
  }

  async getContests() {
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
    // params = params.set('fixture_id', this.fixtureId.toString());
    const value: any = await this.api.get(this.base + '/contests/' + this.id, { params }).toPromise();
    if (value.status) {
      this.contests = value.data.contests;
    }
  }

  getTeam(id) {
    if (this.data) {
      if (this.data.teama_id.toString() === id.toString()) {
        return this.data.teama;
      } else {
        return this.data.teamb;
      }
    }
  }

  async showPrizeBreakup($event: MouseEvent, d: any) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!d.rank_category) {
      this.prizeBreakups = d.prize_breakup;
    } else {
      this.prizeBreakups = d.rank_category.prize_breakup;
      this.prizeBreakups.map((res) => {
        res.prize = (res.percentage * d.prize / 100);
      });
    }
    await this.matDialog.open(this.prizeBreakupTemplate, { panelClass: 'selection-dialog', minWidth: '320px' });
  }
  async showTeams($event: MouseEvent, d: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.userTeamsData = d;
    console.log(d);
    await this.matDialog.open(this.contestTeams, { panelClass: 'selection-dialog', minWidth: '320px' });
  }

  backBtn() {
    window.history.go(-1);
  }

}
