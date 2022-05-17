import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { FormService } from '../../_services/form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { DataService } from '../../_services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  base = 'fixtures';
  data;
  id;
  userId='';
  selectedPlayer;

  @ViewChild('playerStatTemplate') playerStatTemplate: TemplateRef<HTMLElement>;
  search;

  constructor(private api: ApiService,
    private formService: FormService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dataService: DataService,
    private matDialog: MatDialog) {
    this.activatedRoute.paramMap.subscribe(value => {
      if(value.get('fixtureId') && value.get('userId')) {
        this.id = value.get('fixtureId');
        this.userId = value.get('userId');
        this.init().then();

      }else if(value.get('fixtureId')) {
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
    }
  }

  async showPlayerStat($event: MouseEvent, d: any) {
    $event.preventDefault();
    $event.stopPropagation();
    this.selectedPlayer = d;
    await this.matDialog.open(this.playerStatTemplate, {
      panelClass: 'selection-dialog',
      minWidth: '310px',
      maxHeight: '90vh'
    });
  }

  async editPlayer(d) {
    const fields: FormlyFieldConfig[] =
      [
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            // {
            //   key: 'name',
            //   type: 'input',
            //   className: 'col-12',
            //   templateOptions: {
            //     label: 'Name',
            //     required: true
            //   }
            // },
            {
              key: 'fantasy_player_rating',
              type: 'input',
              className: 'col-12',
              templateOptions: {
                label: 'Credit',
                type: 'number'
              }
            },
            {
              key: 'role',
              type: 'select-search',
              className: 'col-12',
              templateOptions: {
                label: 'Role',
                options: this.data.positions
              }
            },
            {
              key: 'image',
              type: 'file',
              className: 'col-12',
              templateOptions: {
                label: 'Image',
                floatLabel: 'always'
              }
            },
            {
              key: 'is_active',
              type: 'toggle',
              className: 'col-12',
              templateOptions: {
                label: 'Is active?',
                appearance: 'none'
              }
            },
          ]
        },
      ];

    const value: any = await this.formService.show(fields, 'squads/' + d.id, 'PUT', Object.assign({}, d), {
      title: 'Edit Player',
      width: '350px'
    });

    if (value) {
      await this.init();
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

  backBtn() {
    window.history.go(-1);
  }
}
