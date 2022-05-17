import { Component,Input, OnInit } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { FormService } from '../../../_services/form.service';
import { DataService } from '../../../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard-details',
  templateUrl: './leaderboard-details.component.html',
  styleUrls: ['./leaderboard-details.component.scss']
})
export class LeaderboardDetailsComponent implements OnInit {
  base='leaderboard-detail';
  checked = true;
  page = 0;
  search = '';
  perPage=0;
  def_inning = 0;
  filter: any = {};
  total=0
  data=[];
  @Input('leaderboardId') leaderboardId = '';

  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.paramMap.subscribe(value => {
      if(value.get('leaderboardId')) {
        this.leaderboardId = value.get('leaderboardId');
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
    params = params.set('leaderboardId', this.leaderboardId);
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
    await this.router.navigate(['/leaderboard/'+this.leaderboardId+"/"], { queryParams: params });
    await this.init();

  }

}
