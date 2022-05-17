import { Component,Input, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { FormService } from '../../_services/form.service';
import { DataService } from '../../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  base='leaderboard';
  checked = true;
  page = 0;
  search = '';
  perPage=0;
  def_inning = 0;
  filter: any = {};
  total=0
  data=[];
  @Input('competitionId') competitionId = '';

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.paramMap.subscribe(value => {
      if(value.get('competitionId')) {
        this.competitionId = value.get('competitionId');
        this.search = value.has('search') ? value.get('search') : '';
        this.init().then();
        this.dataService.setTitle('Leaderboard');
      }
    });
  }

  ngOnInit(): void {
  }

  async init() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('competitionId', this.competitionId);
    params = params.set('search', this.search.toString());
    params = params.set('def_inning', this.def_inning);

    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      const data = value.data;
      this.data = data.users;
      this.total = data.total;
      this.perPage = data.per_page;
      this.page = data.current_page - 1;
    }
  }

  async setParams() {
    const params = Object.assign(this.filter, { page: this.page, search: this.search, perPage: this.perPage });
    await this.router.navigate(['/leaderboard/'+this.competitionId+"/"], { queryParams: params });
    await this.init();

  }

}
