import { Component, Input } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { FormService } from '../../_services/form.service';
import { DataService } from '../../_services/data.service';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent {

  base = 'system-user-detail/edit_team';
  data = [];
  wkdata = [];
  batdata = [];
  ardata = [];
  bowldata = [];
  captData = [];
  leagueData = {};
  teamEditFrom = false;
  aTeamName = '';
  bTeamName = '';
  buttonshow = false;
  wkcount = 0;
  batcount = 0;
  bowlcount = 0;
  arcount = 0;
  page = 0;
  total = 0;
  perPage = 0;
  isDisabled = true;
  submitPlayerData = [];
  filter: any = {};
  search = '';
  ermessage = '';
  creaditsLeft = 100;
  selecttotal_points=0;
  radioCheckarr = [];
  tab;
  type = ['WK', 'BAT', 'AR', 'BOWL'];
  teamData = [];


  @Input('fixtureId') fixtureId = '';
  @Input('contest_id') contest_id = '';
  @Input('user_teams_id') user_teams_id = '';
  constructor(private api: ApiService,
    private formService: FormService,
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.activatedRoute.paramMap.subscribe(value => {
      if (value.get('fixtureId') && value.get('user_teams_id')) {
        this.fixtureId = value.get('fixtureId');
        this.contest_id = value.get('contest_id');
        this.user_teams_id = value.get('user_teams_id');
        this.init().then(() => {
          this.batData().then();
          this.arData().then();
          this.bowlData().then();
          this.dataService.setTitle('Edit Team User');
        });
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
    params = params.set('user_teams_id', this.user_teams_id);
    params = params.set('search', "WK");
    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      const data = value.data;
      this.wkcount = data.selectedCount;
      this.wkdata = data.userdata;
      this.leagueData = data.fixtures;
      this.aTeamName = this.leagueData["teama_short_name"];
      this.bTeamName = this.leagueData["teamb_short_name"];
      this.captData = data.captain_data;
      this.creaditsLeft -= data.allplayer_rating;
      this.selecttotal_points += data.total_points;

      let keys = Object.keys(data.totalPlayerAteam).map(k => {
        if (!this.teamData[k]) {
          this.teamData[k] = 0
        }
        this.teamData[k] = data.totalPlayerAteam[k] + this.teamData[k];

      })
    }
  }

  async batData() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('user_teams_id', this.user_teams_id);
    params = params.set('search', "BAT");
    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      const data = value.data;
      this.batcount = data.selectedCount;
      this.batdata = data.userdata;
      this.creaditsLeft -= data.allplayer_rating;
      this.selecttotal_points += data.total_points;

      let keys = Object.keys(data.totalPlayerAteam).map(k => {

        if (!this.teamData[k]) {
          this.teamData[k] = 0
        }
        this.teamData[k] = data.totalPlayerAteam[k] + this.teamData[k];

      })
    }
  }

  async arData() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('user_teams_id', this.user_teams_id);
    params = params.set('search', "AR");
    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      const data = value.data;
      this.arcount = data.selectedCount;
      this.ardata = data.userdata;
      this.creaditsLeft -= data.allplayer_rating;
      this.selecttotal_points += data.total_points;

      let keys = Object.keys(data.totalPlayerAteam).map(k => {
        if (!this.teamData[k]) {
          this.teamData[k] = 0
        }
        this.teamData[k] = data.totalPlayerAteam[k] + this.teamData[k];
      })
      //this.leagueData = data.fixtures;
    }
    //this.ardata = value;
  }

  async bowlData() {
    let params = new HttpParams();
    params = params.set('page', (this.page + 1).toString());
    params = params.set('per_page', this.perPage.toString());
    params = params.set('fixtureId', this.fixtureId);
    params = params.set('user_teams_id', this.user_teams_id);
    params = params.set('search', "BOWL");
    const value = await this.api.get(this.base, { params }).toPromise();
    if (value.status) {
      const data = value.data;
      this.bowlcount = data.selectedCount;
      this.bowldata = data.userdata;
      this.creaditsLeft -= data.allplayer_rating;
      this.selecttotal_points += data.total_points;

      let keys = Object.keys(data.totalPlayerAteam).map(k => {
        if (!this.teamData[k]) {
          this.teamData[k] = 0
        }
        this.teamData[k] = data.totalPlayerAteam[k] + this.teamData[k];
      })
    }
    //this.bowldata = value;
  }

  editTeamDataSubmit(value) {
    this.teamEditFrom = true;
    this.submitPlayerData = value;

    // this.ardata = this.ardata.map((t)=>{
    //   if(t.total_points <= 0){
    //     //t.total_points = Math.abs(t.total_points)
    //     t.total_points = 8
    //   }
    //   return t
    // })
    // console.log(JSON.stringify(this.ardata)+"default");



    this.ardata = this.ardata.filter((f)=>
                        this.submitPlayerData[f.id] == 1);
    this.batdata = this.batdata.filter((f)=>this.submitPlayerData[f.id] == 1);
    this.wkdata = this.wkdata.filter((f)=>this.submitPlayerData[f.id] == 1);
    this.bowldata = this.bowldata.filter((f)=>this.submitPlayerData[f.id] == 1);

    // console.log(JSON.stringify(this.ardata)+"ardata");
    // console.log(JSON.stringify(this.batdata)+"batdata");
    // console.log(JSON.stringify(this.wkdata)+"wkdata");
    // console.log(JSON.stringify(this.bowldata)+"bowldata");
  }

  // wkcheck(data) {
  //   data.fantasy_player_rating = parseInt(data.fantasy_player_rating);
  //   if (data.user_selected) {
  //     this.creaditsLeft -= data.fantasy_player_rating;
  //     this.wkcount += 1;
  //     this.teamData[data.team_name] += 1;
  //   } else {
  //     this.creaditsLeft += data.fantasy_player_rating;
  //     this.wkcount -= 1;
  //     this.teamData[data.team_name] -= 1;
  //   }
  //   this.chckvalidate(data.team_name, data.id, this.wkdata);
  // }

  wkcheck(data, team_name, id, player_rating,total_points) {
    player_rating = parseFloat(player_rating);
    if (data) {
      this.creaditsLeft -= player_rating;
      this.selecttotal_points+=total_points;
      this.wkcount += 1;
      this.teamData[team_name] += 1;
    } else {
      this.creaditsLeft += player_rating;
      this.selecttotal_points-=total_points;
      this.wkcount -= 1;
      this.teamData[team_name] -= 1;
    }
    this.chckvalidate(team_name, id, this.wkdata);
  }

  batcheck(data, team_name, id, player_rating,total_points) {
    player_rating = parseFloat(player_rating);

    if (data) {
      this.creaditsLeft -= player_rating;
      this.selecttotal_points+=total_points;
      this.batcount += 1;
      this.teamData[team_name] += 1;
    } else {
      this.creaditsLeft += player_rating;
      this.selecttotal_points-=total_points;
      this.batcount -= 1;
      this.teamData[team_name] -= 1;
    }
    this.chckvalidate(team_name, id, this.batdata);
  }

  archeck(data, team_name, id, player_rating,total_points) {
    player_rating = parseFloat(player_rating);

    if (data) {
      this.creaditsLeft -= player_rating;
      this.selecttotal_points+=total_points;
      this.arcount += 1;
      this.teamData[team_name] += 1;
    } else {
      this.creaditsLeft += player_rating;
      this.selecttotal_points-=total_points;
      this.arcount -= 1;
      this.teamData[team_name] -= 1;
    }
    this.chckvalidate(team_name, id, this.ardata);
  }

  bowlcheck(data, team_name, id, player_rating,total_points) {
    player_rating = parseFloat(player_rating);
    //console.log(JSON.stringify(this.bowldata)+"yyyyyy")
    // console.log(player_rating+"ppprrrrr");
    // console.log(this.creaditsLeft+"cccccc");

    if (data) {
      this.creaditsLeft -= player_rating;
      this.selecttotal_points+=total_points;
      this.bowlcount += 1;
      this.teamData[team_name] += 1;
    } else {
      this.creaditsLeft += player_rating;
      this.selecttotal_points-=total_points;
      this.bowlcount -= 1;
      this.teamData[team_name] -= 1;
    }
    this.chckvalidate(team_name, id, this.bowldata);
  }

  chckvalidate(team_name, id, _array) {
    let find = _array.find((f) => f.id == id)
    let fteam_name = find.team_name
    let total_player = this.teamData[this.leagueData['teama_short_name']] + this.teamData[this.leagueData['teamb_short_name']];

    if (this.teamData[team_name] >= 7 || total_player >= 11) {
      let dByTeam = _array.filter(f => {
        return f.team_name === fteam_name
      }).map(m => m.id)
      _array.map((m) => {
        if (dByTeam.includes(m.id)) {
          //m.isDisabled = 1
        }
      })
      this.isDisabled = true;
    } else {
      let dByTeam = _array.filter(f => {
        return f.team_name === fteam_name
      }).map(m => m.id)
      _array.map((m) => {
        if (dByTeam.includes(m.id)) {
          m.isDisabled = 0
        }
      })
      //console.log(dByTeam+"pppppppppppppp");
      this.isDisabled = false;
    }
    //console.log(this.teamData[team_name]+"yyyyyyyyyyYY");
    if (this.teamData[team_name] > 7 || this.teamData[this.leagueData['teamb_short_name']] >7 || this.teamData[this.leagueData['teama_short_name']] >7) {
      this.ermessage = "Select only 7 players per team";
      this.buttonshow = true;
    } else if (this.wkcount == 0) {
      this.ermessage = "Please Select 1 Wicket Keepers";
      this.buttonshow = true;
    } else if (this.batcount < 3 || this.batcount > 6) {
      this.ermessage = "Please Select Batsmen between 3 to 6.";
      this.buttonshow = true;
    } else if (this.bowlcount < 3 || this.bowlcount > 6) {
      this.ermessage = "Please Select Bowlers between 3 to 6.";
      this.buttonshow = true;
    } else if (this.arcount == 0 || this.arcount > 4) {
      this.ermessage = "Please Select All Rounders between 1 to 4.";
      this.buttonshow = true;
    } else if (total_player < 11 || total_player > 11) {
      this.ermessage = "Please Select 11 Player in team.";
      this.buttonshow = true;
    } else if (this.creaditsLeft < 0) {
      this.ermessage = "Creadit balance not fulfill.";
      this.buttonshow = true;
    } else {
      this.ermessage = "";
      this.buttonshow = false;
    }
  }

  editFinalTeamDataSubmit(value) {
    if ((value.master_player == value.captain) || (value.master_player == value.vice_captain) || (value.vice_captain == value.captain) || (value.captain == value.vice_captain)) {
      this.ermessage = "Please choose correct data."
    } else {
      let _sub = this.submitPlayerData

      Object.keys(_sub).map(s => {
        if (_sub[s] != 1 || _sub[s] != true) {
          delete _sub[s]
        }
      })

      let _data = {
        capt_data: JSON.stringify(value),
        player_data: JSON.stringify(_sub),
        user_teams_id: this.user_teams_id,
        contest_id: this.contest_id
      }
      //console.log(_data);

      this.api.post(this.base, _data).subscribe((value) => {
        if (value.status) {
          console.log("success");
          this.router.navigate(['/system-user/' + this.fixtureId]);
        } else {
          console.log("error");
        }
      });
    }
  }

  backUrl() {
    this.teamEditFrom = false;
  }
}
